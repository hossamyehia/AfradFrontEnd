import { TestBed } from '@angular/core/testing';

import { CrimeTypeCacheService } from './crime-type-cache.service';

describe('CrimeTypeCacheService', () => {
  let service: CrimeTypeCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrimeTypeCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
