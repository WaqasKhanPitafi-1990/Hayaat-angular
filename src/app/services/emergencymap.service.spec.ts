import { TestBed, inject } from '@angular/core/testing';

import { EmergencyMapService } from './emergencymap.service';

describe('EmergencyMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmergencyMapService]
    });
  });

  it('should be created', inject([EmergencyMapService], (service: EmergencyMapService) => {
    expect(service).toBeTruthy();
  }));
});
