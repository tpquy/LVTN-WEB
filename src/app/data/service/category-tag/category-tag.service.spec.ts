import { TestBed } from '@angular/core/testing';

import { CategoryTagService } from './category-tag.service';

describe('CategoryTagService', () => {
  let service: CategoryTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
