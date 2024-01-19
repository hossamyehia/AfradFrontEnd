import { TestBed } from '@angular/core/testing';

import { CrimeSanctionCacheService } from './crime-sanction-cache.service';

describe('CrimeSanctionCacheService', () => {
  let service: CrimeSanctionCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrimeSanctionCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
