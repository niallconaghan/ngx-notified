import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxNotifiedRef, NotifiedState } from '../../services/notified-ref';
import { NgxNotifiedService } from '../../services/notified.service';
import { Subject, takeUntil, timer } from 'rxjs';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';

@Component({
  selector: 'ngx-notified-container',
  standalone: true,
  imports: [CommonModule, PortalModule],
  templateUrl: './notified-container.component.html',
  styleUrls: ['./notified-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'notifiedContainer.config.role',
    '[attr.aria-live]': 'notifiedContainer.config.ariaLive',
    '[style.width]': 'notifiedContainer.config.width',
    '[class.ngx-notified-placement-top]': 'notifiedContainer.config?.placement === "top"',
    '[class.ngx-notified-placement-bottom]': 'notifiedContainer.config?.placement === "bottom"',
    '[class.ngx-notified]': 'true',
  },
})
export class NgxNotifiedContainerComponent<T>
  implements AfterViewInit, OnDestroy
{
  @Input() set notifiedContainer(notifiedRef: NgxNotifiedRef | undefined) {
    this.isTemplateRef = notifiedRef?.content instanceof TemplateRef;
    this._notifiedRef = notifiedRef;
  }

  get notifiedContainer(): NgxNotifiedRef | undefined {
    return this._notifiedRef;
  }

  get templateRef(): TemplateRef<{ $implicit: NgxNotifiedRef }> | null {
    return (
      (this.notifiedContainer?.content as TemplateRef<{
        $implicit: NgxNotifiedRef;
      }>) ?? null
    );
  }

  get componentPortal(): ComponentPortal<unknown> | undefined {
    return this.notifiedContainer?.content as ComponentPortal<unknown>;
  }

  isTemplateRef?: boolean;

  @HostBinding('class.ngx-notified-enter')
  get enter(): boolean {
    return this.notifiedContainer?._state === NotifiedState.Enter;
  }

  @HostBinding('class.ngx-notified-exit')
  get exit(): boolean {
    return this.notifiedContainer?._state === NotifiedState.Exit;
  }

  private _notifiedRef?: NgxNotifiedRef;
  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _renderer: Renderer2,
    private readonly _elementRef: ElementRef,
    private readonly _notifiedService: NgxNotifiedService
  ) {}

  ngAfterViewInit(): void {
    if (this.notifiedContainer) {
      this.notifiedContainer._ref = this._elementRef;
    }

    this.autoDismiss();
    this._notifiedService.notifications$.pipe(takeUntil(this._destroy$))
    .subscribe(() => {
      this.removeAlignmentPosition();
      this.setAlignmentPosition();
      this.setPlacementPosition();
    });

  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private autoDismiss(): void {
    if (!this.notifiedContainer?.config.duration) {
      return;
    }

    timer(this.notifiedContainer.config.duration)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this.notifiedContainer?.dismiss());
  }

  private setAlignmentPosition(): void {
    if (this.notifiedContainer?.config.alignment === 'start') {
      this._renderer.setStyle(
        this.notifiedContainer._ref?.nativeElement,
        'inset-inline-start',
        '16px'
      );
    } else if (this.notifiedContainer?.config.alignment === 'end') {
      this._renderer.setStyle(
        this.notifiedContainer._ref?.nativeElement,
        'inset-inline-end',
        '16px'
      );
    } else if (this.notifiedContainer?.config.alignment === 'center') {
      this._renderer.setStyle(
        this.notifiedContainer._ref?.nativeElement,
        'inset-inline-start',
        `calc(50% - calc(${this.notifiedContainer.config.width} / 2))`
      );
    }
  }

  private removeAlignmentPosition(): void {
    this._renderer.removeStyle(
      this.notifiedContainer?._ref?.nativeElement,
      'inset-inline-start'
    );
  }

  private setPlacementPosition(): void {
    const notifications = this._notifiedService.notifications.filter(
      notification =>
        notification.config.alignment === this.notifiedContainer?.config.alignment &&
        notification.config.placement === this.notifiedContainer?.config.placement
    );

    const index = notifications.findIndex(n => n._id === this.notifiedContainer?._id);

    const notificationsLaunchedBefore = notifications.slice(0, index);

    const offset = notificationsLaunchedBefore.reduce(
      (total, notification) => total + (notification._ref?.nativeElement?.offsetHeight ?? 0),
      0
    );

    this._renderer.setStyle(
      this.notifiedContainer?._ref?.nativeElement,
      `${this.notifiedContainer?.config.placement}`,
      `calc(${offset}px + calc(16px * ${index + 1}))`
    );
  }
}
