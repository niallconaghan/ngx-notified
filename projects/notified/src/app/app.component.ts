import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NotifiedAllignment, NotifiedPlacement } from 'projects/ngx-notified/src/lib/interfaces/notified-config';
import { NgxNotifiedRef } from 'projects/ngx-notified/src/lib/services/notified-ref';
import { NgxNotifiedService } from 'projects/ngx-notified/src/public-api';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notified';

  placement: NotifiedPlacement = 'top';
  alignment: NotifiedAllignment = 'end';
  duration: number | undefined = 5000;
  dismissible: boolean = true;

  width: number = 380;

  @ViewChild('templateNotification') templatePortalContent!: TemplateRef<{
    $implicit: NgxNotifiedRef;
  }>;

  constructor(private readonly _notified: NgxNotifiedService) {
  }

  openFromComponent(): void {
    this._notified.createFromComponent(NotificationComponent, {
      duration: this.duration,
      alignment: this.alignment,
      placement: this.placement,
      width: this.width
    });
  }

  openFromTemplate(): void {
    this._notified.createFromTemplate(this.templatePortalContent, {
      duration: this.duration,
      alignment: this.alignment,
      placement: this.placement,
      width: this.width
    });
  }
}
