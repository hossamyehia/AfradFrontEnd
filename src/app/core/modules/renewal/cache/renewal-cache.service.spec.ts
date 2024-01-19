import { TestBed } from '@angular/core/testing';

import { RenewalCacheService } from './renewal-cache.service';

describe('RenewalCacheService', () => {
  let service: RenewalCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenewalCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
