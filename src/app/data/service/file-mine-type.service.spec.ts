import { TestBed } from '@angular/core/testing';

import { FileMineTypeService } from './file-mine-type.service';

describe('FileMineTypeService', () => {
  let service: FileMineTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileMineTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
