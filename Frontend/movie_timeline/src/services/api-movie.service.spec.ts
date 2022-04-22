import { TestBed } from '@angular/core/testing';

import { ApiMovieService } from './api-movie.service';

describe('ApiMovieService', () => {
  let service: ApiMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
