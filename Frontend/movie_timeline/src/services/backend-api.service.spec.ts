import { TestBed } from '@angular/core/testing';

import { BackendAPIserviceService } from './backend-api.service';

describe('BackendAPIserviceService', () => {
  let service: BackendAPIserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendAPIserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
