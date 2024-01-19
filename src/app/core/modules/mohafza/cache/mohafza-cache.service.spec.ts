import { TestBed } from '@angular/core/testing';

import { MohafzaCacheService } from './mohafza-cache.service';

describe('MohafzaCacheService', () => {
  let service: MohafzaCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MohafzaCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
