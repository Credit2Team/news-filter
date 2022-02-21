import { TestBed } from '@angular/core/testing';

import { FilterFacadeService } from './filter-facade.service';

describe('FilterFacadeService', () => {
  let service: FilterFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
