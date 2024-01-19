import { TestBed } from '@angular/core/testing';

import { DaragaCacheService } from './daraga-cache.service';

describe('DaragaCacheService', () => {
  let service: DaragaCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaragaCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
