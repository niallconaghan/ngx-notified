import { ComponentPortal } from '@angular/cdk/portal';
import { ElementRef, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NotifiedConfig } from '../interfaces/notified-config';

let id: number = 1;

export class NgxNotifiedRef {
  readonly dismissed$ = new Subject<void>()
  readonly _id = id++;
  _ref?: ElementRef;
  _state?: NotifiedState = NotifiedState.Enter;

  constructor(
    public content: ComponentPortal<unknown> | TemplateRef<{ $implicit: NgxNotifiedRef }>,
    public config: NotifiedConfig
  ) {}

  dismiss(): void {
    this.dismissed$.next();
    this._state = NotifiedState.Exit;
  }
}

export enum NotifiedState {
  Enter,
  Shown,
  Exit,
}
