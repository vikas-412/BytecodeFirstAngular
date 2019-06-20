import { TestBed, inject } from '@angular/core/testing';

import { ServerApiHitService } from './server-api-hit.service';

describe('ServerApiHitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerApiHitService]
    });
  });

  it('should be created', inject([ServerApiHitService], (service: ServerApiHitService) => {
    expect(service).toBeTruthy();
  }));
});
