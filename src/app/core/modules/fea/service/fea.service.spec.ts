import { TestBed } from '@angular/core/testing';

import { FeaService } from './fea.service';

describe('FeaService', () => {
  let service: FeaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
