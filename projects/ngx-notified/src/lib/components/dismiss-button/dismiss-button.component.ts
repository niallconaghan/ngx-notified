import { ChangeDetectionStrategy, Component, HostListener, OnInit, Optional } from '@angular/core';
import { NgxNotifiedRef } from '../../services/notified-ref';

@Component({
  selector: 'button[ngx-notified-dismiss-button]',
  templateUrl: './dismiss-button.component.html',
  styleUrls: ['./dismiss-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxNotifiedDismissButtonComponent {
  constructor(@Optional() private readonly _notifiedRef?: NgxNotifiedRef) {}

  @HostListener('click')
  _close(): void {
    this._notifiedRef?.dismiss();
  }
}
