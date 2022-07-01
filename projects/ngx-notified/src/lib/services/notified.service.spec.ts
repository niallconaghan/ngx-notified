import { TestBed } from '@angular/core/testing';

import { NotifiedService } from './notified.service';

describe('NotifiedService', () => {
  let service: NotifiedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifiedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
