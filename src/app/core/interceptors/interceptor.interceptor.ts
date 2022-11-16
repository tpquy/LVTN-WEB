import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInjectionInterceptor } from './token-injection.interceptor';
import { HandleUnauthorizedInterceptor } from './handle-unauthorized.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInjectionInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HandleUnauthorizedInterceptor, multi: true }
];