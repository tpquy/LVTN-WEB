import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from '../service/auth.service';

@Injectable()
export class HandleUnauthorizedInterceptor implements HttpInterceptor {
  loginState = false;
  constructor(
    private keycloakService: KeycloakService,
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.keycloakService.isLoggedIn().then(state => {
      this.loginState = state;
    });
    // if (request.headers.get('IgnoreIntercepter') == 'true') {
    //   const newHeaders = request.headers.delete('IgnoreIntercepter');
    //   request = request.clone({ headers: newHeaders });
    // } else {
    //   const token = request.headers.get('Authorization');
    //   if (token != undefined || token != null) {
    //     const tokenExpired: boolean = this.checkTokenExpired(token);
    //     if (tokenExpired) {
    //       if (this.loginState == true) {
    //         this.keycloakService.login();
    //       } else {
    //         this.authService.getClientToken().subscribe((r: any) => {
    //           localStorage.setItem('oauth2ClientToken', r.access_token);
    //         });
    //         request = request.clone({
    //           headers: new HttpHeaders({
    //             'Authorization': 'Bearer ' + localStorage.getItem('oauth2ClientToken')
    //           })
    //         });
    //       }
    //     }
    //   }
    // }
    return next.handle(request);
  }

  checkTokenExpired(token: string): boolean {
    try {
      const expiredTimestamp = JSON.parse(atob(token.split('.')[1])).exp;
      const currentTimestamp = Date.now() / 1000 | 0 + 1;
      return expiredTimestamp < currentTimestamp;
    }
    catch (e) {
      return true;
    }
  }
}