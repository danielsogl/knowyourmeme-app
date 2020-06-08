import { TestBed } from '@angular/core/testing';

import { MemeApiService } from './meme-api.service';

describe('MemeApiService', () => {
  let service: MemeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
