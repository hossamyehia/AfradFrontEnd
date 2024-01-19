import { TestBed } from '@angular/core/testing';

import { MissionCacheService } from './mission-cache.service';

describe('MissionCacheService', () => {
  let service: MissionCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissionCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
