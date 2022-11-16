import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiProviderService } from 'src/app/core/service/api-provider.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private apiProviderService: ApiProviderService) { }

  // private orderPath = this.apiProviderService.getUrl('digo', 'eduiso') + '/tag/';
  private orderPath = 'http://localhost:8080/order/';

  // getListOrder(searchString): Observable<any> {
  //   const token = localStorage.getItem('OAuth2TOKEN');
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Authorization', 'Bearer ' + token);
  //   headers = headers.append('Content-Type', 'application/json');
  //   headers.append('Access-Control-Allow-Origin', '*');
  //   headers = headers.set('Accept-Language', localStorage.getItem('language'));
  //   return this.http.get(this.orderPath + 'overview' + searchString, { headers });
  // }

  // getListOrderAdmin(searchString): Observable<any> {
  //   const token = localStorage.getItem('OAuth2TOKEN');
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Authorization', 'Bearer ' + token);
  //   headers = headers.append('Content-Type', 'application/json');
  //   headers.append('Access-Control-Allow-Origin', '*');
  //   headers = headers.set('Accept-Language', localStorage.getItem('language'));
  //   return this.http.get(this.orderPath + 'overview-admin' +  searchString, { headers });
  // }

  getListOrder(searchString): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.orderPath + '--no-paginate'+  searchString, { headers });
  }


  getDetailOrder(id): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.orderPath +  id, { headers });
  }

  postOrder(requestBody): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.post<any>(this.orderPath, requestBody, { headers });
  }

  putOrder(id: string, requestBody): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.put<any>(this.orderPath + id, requestBody, { headers });
  }

  addStatus(id: string, requestBody): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.put<any>(this.orderPath +'--add-status/'+ id, requestBody, { headers });
  }

  deleteOrder(id: string): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.delete(this.orderPath + id, { headers });
  }

  checkDuplicateCode(check): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.orderPath + 'duplicate-code' + check, { headers });
  }
}
