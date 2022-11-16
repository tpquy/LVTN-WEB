import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiProviderService } from 'src/app/core/service/api-provider.service';

@Injectable({
  providedIn: 'root'
})
export class CpuService {

  constructor(private http: HttpClient, private apiProviderService: ApiProviderService) { }
  private cpuPath = 'http://localhost:8080' + '/cpu/';

  getListCPU(searchString): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.cpuPath + searchString, { headers });
  }


  getDetailCPU(id): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.cpuPath + id, { headers });
  }

  postCPU(requestBody): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.post<any>(this.cpuPath, requestBody, { headers });
  }

  putCPU(id: string, requestBody): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.put<any>(this.cpuPath  + id, requestBody, { headers });
  }

  deleteCPU(id: string): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.delete(this.cpuPath + id, { headers });
  }

  checkDuplicateCode(check): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.cpuPath + 'duplicate-code' + check, { headers });
  }
}
