import { TestBed, inject } from '@angular/core/testing';

import { EmergencylistingService } from './emergencylisting.service';

describe('EmergencylistingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmergencylistingService]
    });
  });

  it('should be created', inject([EmergencylistingService], (service: EmergencylistingService) => {
    expect(service).toBeTruthy();
  }));
});
