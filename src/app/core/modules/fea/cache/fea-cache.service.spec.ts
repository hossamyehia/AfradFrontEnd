import { TestBed } from '@angular/core/testing';

import { FeaCacheService } from './fea-cache.service';

describe('FeaCacheService', () => {
  let service: FeaCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
