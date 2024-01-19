import { TestBed } from '@angular/core/testing';

import { EfficencyReportsService } from './efficency-reports.service';

describe('EfficencyReportsService', () => {
  let service: EfficencyReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EfficencyReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
