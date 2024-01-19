import { TestBed } from '@angular/core/testing';

import { DaragaService } from './daraga.service';

describe('DaragaService', () => {
  let service: DaragaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaragaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
