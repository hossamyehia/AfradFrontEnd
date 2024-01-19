import { TestBed } from '@angular/core/testing';

import { JobTitleCacheService } from './job-title-cache.service';

describe('JobTitleCacheService', () => {
  let service: JobTitleCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobTitleCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
