import { TestBed } from '@angular/core/testing';

import { QualificationCacheService } from './qualification-cache.service';

describe('QualificationCacheService', () => {
  let service: QualificationCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualificationCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
