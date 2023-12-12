import { TestBed, inject } from '@angular/core/testing';

import { DonerlistingService } from './donerlisting.service';

describe('DonerlistingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DonerlistingService]
    });
  });

  it('should be created', inject([DonerlistingService], (service: DonerlistingService) => {
    expect(service).toBeTruthy();
  }));
});
