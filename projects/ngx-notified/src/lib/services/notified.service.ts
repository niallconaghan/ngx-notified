import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  ComponentPortal,
  ComponentType,
  DomPortalOutlet,
} from '@angular/cdk/portal';
import { NotifiedConfig } from '../interfaces/notified-config';
import { NgxNotifiedRef } from './notified-ref';
import { BehaviorSubject } from 'rxjs';
import { NgxNotifiedContainerComponent } from '../components/notified-container/notified-container.component';

@Injectable({
  providedIn: 'root',
})
export class NgxNotifiedService {
  notifications$: BehaviorSubject<NgxNotifiedRef[]> = new BehaviorSubject<
    NgxNotifiedRef[]
  >([]);

  get notifications(): NgxNotifiedRef[] {
    return this.notifications$.value;
  }

  constructor(private readonly _parentInjector: Injector) {}

  createFromTemplate(
    templateRef: TemplateRef<{ $implicit: NgxNotifiedRef }>,
    config?: NotifiedConfig
  ): NgxNotifiedRef {
    const _config = this.getConfig(config);

    const notificationRef = new NgxNotifiedRef(templateRef, _config);

    this.notifications.push(notificationRef);
    this.notifications$.next(this.notifications);

    return notificationRef;
  }

  createFromComponent<T>(
    component: ComponentType<T>,
    config?: NotifiedConfig
  ): NgxNotifiedRef {
    const _config = this.getConfig(config);
    const content = this.getComponentPortal<T>(component);
    const notifiedRef = new NgxNotifiedRef(content, _config);

    content.injector = this.getInjector(notifiedRef, this._parentInjector);

    this.notifications.push(notifiedRef);
    this.notifications$.next(this.notifications);

    return notifiedRef;
  }

  _dismiss(ref: NgxNotifiedRef): void {
    this.notifications.splice(this.notifications.indexOf(ref), 1);
    this.notifications$.next(this.notifications);
  }

  private getComponentPortal<T>(
    component: ComponentType<T>
  ): ComponentPortal<T> {
    return new ComponentPortal(component, null);
  }

  private getInjector(
    notificationRef: NgxNotifiedRef,
    parentInjector: Injector
  ): Injector {
    return Injector.create({
      providers: [{ provide: NgxNotifiedRef, useValue: notificationRef }],
      parent: parentInjector,
    });
  }

  private getConfig(config?: NotifiedConfig): NotifiedConfig {
    const width = config?.width ?? 380;
    const cssWidth = typeof width === 'number' ? `${width}px` : width;

    return {
      alignment: 'end',
      placement: 'top',
      role: 'alert',
      ...config,
      width: cssWidth,
    };
  }
}
