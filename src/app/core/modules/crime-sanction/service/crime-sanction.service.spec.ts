import { TestBed } from '@angular/core/testing';

import { CrimeSanctionService } from './crime-sanction.service';

describe('CrimeSanctionService', () => {
  let service: CrimeSanctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrimeSanctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
