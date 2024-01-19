import { TestBed } from '@angular/core/testing';

import { WehdaCacheService } from './wehda-cache.service';

describe('WehdaCacheService', () => {
  let service: WehdaCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WehdaCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
