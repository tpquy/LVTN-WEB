import { TestBed } from '@angular/core/testing';

import { AdminLayoutServiceService } from './admin-layout-service.service';

describe('AdminLayoutServiceService', () => {
  let service: AdminLayoutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminLayoutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
