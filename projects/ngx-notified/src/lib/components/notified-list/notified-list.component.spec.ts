import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifiedListComponent } from './notified-list.component';

describe('NotifiedListComponent', () => {
  let component: NotifiedListComponent;
  let fixture: ComponentFixture<NotifiedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NotifiedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifiedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
