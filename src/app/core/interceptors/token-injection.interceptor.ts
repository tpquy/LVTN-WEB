import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class TokenInjectionInterceptor implements HttpInterceptor {
  loginState = false;
  constructor(
    private keycloakService: KeycloakService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.keycloakService.isLoggedIn().then(state => {
      this.loginState = state;
    });
    if (this.loginState === false) {
      let token = request.headers.get('Authorization');
      if (token == undefined || token == null) {
        if (request.headers.get('IgnoreIntercepter') == 'true') {
          const newHeaders = request.headers.delete('IgnoreIntercepter');
          request = request.clone({ headers: newHeaders });
        } else {
          request = request.clone({
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + localStorage.getItem('oauth2ClientToken')
            })
          });
        }
      }
    }
    return next.handle(request);
  }
}
