import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxNotifiedModule } from 'ngx-notified';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxNotifiedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
