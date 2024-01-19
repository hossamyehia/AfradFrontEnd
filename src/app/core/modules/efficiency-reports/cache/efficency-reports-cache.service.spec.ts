import { TestBed } from '@angular/core/testing';

import { EfficencyReportsCacheService } from './efficency-reports-cache.service';

describe('EfficencyReportsCacheService', () => {
  let service: EfficencyReportsCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EfficencyReportsCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
