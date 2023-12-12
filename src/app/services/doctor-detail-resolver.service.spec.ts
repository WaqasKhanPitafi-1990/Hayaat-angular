import { TestBed, inject } from '@angular/core/testing';

import { DoctorDetailResolverService } from './doctor-detail-resolver.service';

describe('DoctorDetailResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorDetailResolverService]
    });
  });

  it('should be created', inject([DoctorDetailResolverService], (service: DoctorDetailResolverService) => {
    expect(service).toBeTruthy();
  }));
});
