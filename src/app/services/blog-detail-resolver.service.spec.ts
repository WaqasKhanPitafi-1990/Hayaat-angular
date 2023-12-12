import { TestBed, inject } from '@angular/core/testing';

import { BlogDetailResolverService } from './blog-detail-resolver.service';

describe('BlogDetailResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogDetailResolverService]
    });
  });

  it('should be created', inject([BlogDetailResolverService], (service: BlogDetailResolverService) => {
    expect(service).toBeTruthy();
  }));
});
