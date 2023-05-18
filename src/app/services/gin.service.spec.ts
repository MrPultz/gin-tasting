import { TestBed } from '@angular/core/testing';

import { GinService } from './gin.service';

describe('GinService', () => {
  let service: GinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
