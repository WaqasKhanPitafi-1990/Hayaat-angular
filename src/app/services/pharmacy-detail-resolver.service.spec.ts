import { TestBed, inject } from '@angular/core/testing';

import { PharmacyDetailResolverService } from './pharmacy-detail-resolver.service';

describe('PharmacyDetailResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PharmacyDetailResolverService]
    });
  });

  it('should be created', inject([PharmacyDetailResolverService], (service: PharmacyDetailResolverService) => {
    expect(service).toBeTruthy();
  }));
});
