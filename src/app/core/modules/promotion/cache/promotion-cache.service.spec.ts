import { TestBed } from '@angular/core/testing';

import { PromotionCacheService } from './promotion-cache.service';

describe('PromotionCacheService', () => {
  let service: PromotionCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotionCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
