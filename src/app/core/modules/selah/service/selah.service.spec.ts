import { TestBed } from '@angular/core/testing';

import { SelahService } from './selah.service';

describe('SelahService', () => {
  let service: SelahService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelahService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
