import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DismissButtonComponent } from './dismiss-button.component';

describe('DismissButtonComponent', () => {
  let component: DismissButtonComponent;
  let fixture: ComponentFixture<DismissButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DismissButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DismissButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
