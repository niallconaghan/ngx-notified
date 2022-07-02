# ngx-notified

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0.


## Demo

Coming soon.

## Install

Using npm:

`npm install ngx-notified --save`

## Documentation

Import `NgxNotificationModule` into your `AppModule`

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxNotifiedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Add the `ngx-notified-list` component to the root of your application.

```html
<!-- app.component.html -->
<ngx-notified-list></ngx-notified-list>
```

Inject `NgxNotifiedService` into the component you use trigger a notification from.

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { NgxNotifiedService } from 'projects/ngx-notified/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private readonly _notified: NgxNotifiedService) {}

}

```

### Create a notification from a `TemplateRef`

Create your notification content within an `ng-template`.
Create a button to launch your notification.

```html
<!-- app.component.html -->
<ng-template #templateNotification let-notification>
  <span>This is a notification created from a custom template!</span>
</ng-template>

<button (click)="openFromTemplate()"></button>
```

In your component class add a ViewChild to select your `TemplateRef`

```typescript
// app.component.ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('templateNotification') templatePortalContent!: TemplateRef<{
    $implicit: NgxNotifiedRef;
  }>;

  constructor(private readonly _notified: NgxNotifiedService) {
  }
}
```

Launch your notification by calling the `createFromTemplate` function on `NgxNotifiedService` passing your `TemplateRef`:

```typescript
// app.component.ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('templateNotification') templatePortalContent!: TemplateRef<{
    $implicit: NgxNotifiedRef;
  }>;

  constructor(private readonly _notified: NgxNotifiedService) {
  }

  openFromTemplate(): void {
    this._notified.createFromTemplate(this.templatePortalContent);
  }
}
```

### Create a notification from a custom component.

Generate your custom notification component:

```
ng g c notification
```

Launch your notification by calling the `openFromComponent` function on `NgxNotifiedService` passing your `NotificationComponent`:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { NgxNotifiedService } from 'projects/ngx-notified/src/public-api';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly _notified: NgxNotifiedService) {
  }

  openFromComponent(): void {
    this._notified.createFromComponent(NotificationComponent);
  }
}
```

## Dismiss button

A dismiss button can be added to dismiss the notification when clicked.

Template example:

```html
<ng-template #templateNotification let-notification>
  <span>This is a notification created from a custom template!</span>
  <button ngx-notified-dismiss-button (click)="notification.dismiss()"></button>
</ng-template>
```

Component example:

```html
<!-- notification.component.html -->
<button ngx-notified-dismiss-button></button>
<span>This is a notification created from a custom component!</span>
```


## Configuration

Both `createFromComponent` and `createFromTemplate` can take optional configuration object:

| Configuration property | Type                         | Description                                                | Default   |
| ---------------------- | ---------------------------- | ---------------------------------------------------------- | --------- |
| alignment              | 'start' \| 'center' \| 'end' | horizontal position                                        | 'end'     |
| placement              | 'top' \| 'bottom'            | vertical position                                          | 'top'     |
| duration               | number                       | duration in ms that the notitication will be displayed for | 0         |
| role                   | number                       | role attribute                                             | undefined |
| width                  | number                       | width of the notification in px                            | 380       |


A duration of 0 null or undefined will display the notification until dismissed.
### Example

```typescript
    this._notified.createFromComponent(NotificationComponent, {
      alignment: 'end',
      placement: 'top',
      duration: 3000,
      role: 'alert',
      width: 500
    });
```


