import { TestBed, inject } from '@angular/core/testing';

import { DoctorlistingService } from './doctorlisting.service';

describe('DoctorlistingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorlistingService]
    });
  });

  it('should be created', inject([DoctorlistingService], (service: DoctorlistingService) => {
    expect(service).toBeTruthy();
  }));
});
