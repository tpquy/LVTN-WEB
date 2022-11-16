import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiProviderService } from './api-provider.service';
import { EnvService } from './env.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

export enum Role{
  Guess= 'Guess',
  User = 'User',
  Admin = 'Admin'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginSucces = false;
  role: string;

  constructor(
    private http: HttpClient, 
    private apiProvider: ApiProviderService, 
    private envService: EnvService,
    private router: Router
    ) { }

  private userPath = 'http://localhost:8080' + '/user/';
  private authPath = 'http://localhost:8080' + '/auth/';
  private token;
  
  setTokenAndInitialValue(token) {
    this.token = localStorage.setItem('token', token);
    let tokenObject: any = jwt_decode(token);
    localStorage.setItem('username', tokenObject.sub);
    localStorage.setItem('id', tokenObject.id);
    localStorage.setItem('name', tokenObject.name);
    localStorage.setItem('role', tokenObject.role);
    localStorage.setItem('exp', tokenObject.exp);
  }


  // getToken(username: string, password: string){
  //   if(username === 'admin' && password === '1'){
  //     return {
  //       error: false,
  //       id: "1234567890",
  //       username: "admin",
  //       role: "admin"
  //     }
  //   }
  //   else{
  //     return {
  //       error: true
  //     }
  //   }
  // }
  getToken() {
    if (this.token != null) {
      return jwt_decode(this.token);
    }
  }

  login(status){
    if(status){
      this.loginSucces = true;
      this.role = localStorage.getItem('role');
      this.router.navigate(['/admin']);

    }else{
      this.loginSucces = false;
      this.role = 'guess'
    }
    // Redirect to dashboard (AuthGuard will check with canActivate() method )
    // this.router.navigate(['/home']);
  }
 
  // Redirect to login page
  logout(){
    this.role = 'guess';
    this.loginSucces = false;
    localStorage.clear();
    localStorage.setItem('language', 'vi');
    localStorage.setItem('languageId', '228');
    this.router.navigate(['/authenticate']);
  }
 
  isAuthenticated(){
    // return true if the user enter correct user name and password
    return this.loginSucces
  }


  checkDuplicateCode(check): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.userPath + 'check-duplicate' + check, { headers });
  }

  getListUser(searchString): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.userPath + searchString, { headers });
  }


  getDetailUser(id): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.userPath + id, { headers });
  }

  postUser(requestBody): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.post<any>(this.userPath, requestBody, { headers });
  }

  putUser(id: string, requestBody): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.put<any>(this.userPath  + id, requestBody, { headers });
  }

  deleteUser(id: string): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.delete(this.userPath + id, { headers });
  }

  register(requestBody): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.post<any>(this.authPath + 'register', requestBody, { headers });
  }

  authen(requestBody): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.post<any>(this.authPath + 'login', requestBody, { headers });
  }

  getUserRole() {
    const tempRole = localStorage.getItem('role');
    let roleName;
    if (tempRole == "webAdmin") {
      roleName = "Quản trị cấp cao"; 
    } else if (tempRole == "superAdmin") {
      roleName = "Quản trị trang web"
    } else if (tempRole == "orderAdmin") {
      roleName = "Quản lý đơn hàng"
    } else if (tempRole == "productAdmin") {
      roleName = "Quản lý sản phẩm"
    } else if (tempRole == "transportStaff") {
      roleName = "Nhân viên vận chuyển"
    } else {
      roleName = "Người dùng"
    }
    return roleName;
  }
}

