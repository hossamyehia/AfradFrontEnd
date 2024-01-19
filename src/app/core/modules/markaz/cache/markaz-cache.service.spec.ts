import { TestBed } from '@angular/core/testing';

import { MarkazCacheService } from './markaz-cache.service';

describe('MarkazCacheService', () => {
  let service: MarkazCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkazCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
