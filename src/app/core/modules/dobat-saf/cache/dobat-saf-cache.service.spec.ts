import { TestBed } from '@angular/core/testing';

import { DobatSafCacheService } from './dobat-saf-cache.service';

describe('DobatSafCacheService', () => {
  let service: DobatSafCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DobatSafCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
