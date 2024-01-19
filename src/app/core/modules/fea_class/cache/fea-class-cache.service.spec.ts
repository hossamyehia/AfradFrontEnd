import { TestBed } from '@angular/core/testing';

import { FeaClassCacheService } from './fea-class-cache.service';

describe('FeaClassCacheService', () => {
  let service: FeaClassCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaClassCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
