import { TestBed } from '@angular/core/testing';

import { DobatSafService } from './dobat-saf.service';

describe('DobatSafService', () => {
  let service: DobatSafService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DobatSafService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
