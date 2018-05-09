import { TestBed, inject } from '@angular/core/testing';

import { AplicationService } from './aplication.service';

describe('AplicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AplicationService]
    });
  });

  it('should ...', inject([AplicationService], (service: AplicationService) => {
    expect(service).toBeTruthy();
  }));
});
