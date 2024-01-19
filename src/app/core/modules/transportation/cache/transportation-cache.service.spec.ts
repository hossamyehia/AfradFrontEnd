import { TestBed } from '@angular/core/testing';

import { TransportationCacheService } from './transportation-cache.service';

describe('TransportationCacheService', () => {
  let service: TransportationCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportationCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
