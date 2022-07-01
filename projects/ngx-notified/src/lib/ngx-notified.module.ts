import { NgModule } from '@angular/core';
import { NgxNotifiedListComponent } from './components/notified-list/notified-list.component';
import { NgxNotifiedDismissButtonComponent } from './components/dismiss-button/dismiss-button.component';

@NgModule({
  declarations: [
    NgxNotifiedDismissButtonComponent
  ],
  imports: [
    NgxNotifiedListComponent
  ],
  exports: [
    NgxNotifiedListComponent,
    NgxNotifiedDismissButtonComponent
  ]
})
export class NgxNotifiedModule { }
