import { TestBed } from '@angular/core/testing';

import { MarkazService } from './markaz.service';

describe('MarkazService', () => {
  let service: MarkazService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkazService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
