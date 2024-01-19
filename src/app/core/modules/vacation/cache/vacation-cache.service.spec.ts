import { TestBed } from '@angular/core/testing';

import { VacationCacheService } from './vacation-cache.service';

describe('VacationCacheService', () => {
  let service: VacationCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacationCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
