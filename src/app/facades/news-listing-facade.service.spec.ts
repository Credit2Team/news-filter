import { TestBed } from '@angular/core/testing';

import { NewsListingFacadeService } from './news-listing-facade.service';

describe('NewsListingFacadeService', () => {
  let service: NewsListingFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsListingFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
