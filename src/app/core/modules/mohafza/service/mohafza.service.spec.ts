import { TestBed } from '@angular/core/testing';

import { MohafzaService } from './mohafza.service';

describe('MohafzaService', () => {
  let service: MohafzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MohafzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
