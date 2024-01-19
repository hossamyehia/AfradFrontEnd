import { TestBed } from '@angular/core/testing';

import { KhedmaStatusService } from './khedma-status.service';

describe('KhedmaStatusService', () => {
  let service: KhedmaStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhedmaStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
