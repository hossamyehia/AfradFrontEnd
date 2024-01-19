import { TestBed } from '@angular/core/testing';

import { SelahCacheService } from './selah-cache.service';

describe('SelahCacheService', () => {
  let service: SelahCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelahCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
