import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxNotifiedContainerComponent } from '../notified-container/notified-container.component';
import { NgxNotifiedService } from '../../services/notified.service';
import { NgxNotifiedRef, NotifiedState } from '../../services/notified-ref';

@Component({
  selector: 'ngx-notified-list',
  standalone: true,
  imports: [CommonModule, NgxNotifiedContainerComponent],
  templateUrl: './notified-list.component.html',
  styleUrls: ['./notified-list.component.scss']
})
export class NgxNotifiedListComponent implements OnInit {
  notifications$ = this._notifiedService.notifications$;

  constructor(private readonly _notifiedService: NgxNotifiedService) {}


  ngOnInit(): void {
  }

  onAnimationEnd(ref: NgxNotifiedRef): void {
    if (ref._state === NotifiedState.Enter) {
      ref._state = NotifiedState.Shown;
    }

    if (ref._state === NotifiedState.Exit) {
      this._notifiedService._dismiss(ref);
    }
  }
}
