import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifiedContainerComponent } from './notified-container.component';

describe('NotifiedContainerComponent', () => {
  let component: NotifiedContainerComponent;
  let fixture: ComponentFixture<NotifiedContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NotifiedContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifiedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
