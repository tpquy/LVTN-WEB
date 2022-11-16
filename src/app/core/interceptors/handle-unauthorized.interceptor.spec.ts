import { TestBed } from '@angular/core/testing';

import { HandleUnauthorizedInterceptor } from './handle-unauthorized.interceptor';

describe('HandleUnauthorizedInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HandleUnauthorizedInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HandleUnauthorizedInterceptor = TestBed.inject(HandleUnauthorizedInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
