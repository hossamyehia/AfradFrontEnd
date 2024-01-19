import { TestBed } from '@angular/core/testing';

import { SanctionCacheService } from './sanction-cache.service';

describe('SanctionCacheService', () => {
  let service: SanctionCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanctionCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
