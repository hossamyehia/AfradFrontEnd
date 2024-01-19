import { TestBed } from '@angular/core/testing';

import { KhedmaStatusCacheService } from './khedma-status-cache.service';

describe('KhedmaStatusCacheService', () => {
  let service: KhedmaStatusCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhedmaStatusCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
