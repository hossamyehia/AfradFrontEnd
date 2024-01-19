import { TestBed } from '@angular/core/testing';

import { CrimeTypeService } from './crime-type.service';

describe('CrimeTypeService', () => {
  let service: CrimeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrimeTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
