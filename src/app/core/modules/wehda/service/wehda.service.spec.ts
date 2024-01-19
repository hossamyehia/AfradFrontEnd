import { TestBed } from '@angular/core/testing';

import { WehdaService } from './wehda.service';

describe('WehdaService', () => {
  let service: WehdaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WehdaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
