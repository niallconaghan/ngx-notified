import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxNotifiedModule } from 'projects/ngx-notified/src/public-api';

import { AppComponent } from './app.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    NgxNotifiedModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
