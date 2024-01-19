import { TestBed } from '@angular/core/testing';

import { FeaClassService } from './fea-class.service';

describe('FeaClassService', () => {
  let service: FeaClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
