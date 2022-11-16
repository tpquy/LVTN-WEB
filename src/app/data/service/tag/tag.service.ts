import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiProviderService } from 'src/app/core/service/api-provider.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient, private apiProviderService: ApiProviderService) { }

  // private tagPaths = this.apiProviderService.getUrl('digo', 'eduiso') + '/tag/';
  private tagPaths = 'http://localhost:8080' + '/tag/';

  private agencyPath = this.apiProviderService.getUrl('digo', 'basedata') + '/agency/';
  
  getListTag(searchString): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.tagPaths + searchString, { headers });
  }

  getListTagByCategory(id): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.tagPaths + '--by-category/' + id, { headers });
  }

  getListAgency(searchString): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.agencyPath + searchString, { headers });
  }

  getDetailTag(id): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.tagPaths + id, { headers });
  }

  postTag(requestBody): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.post<any>(this.tagPaths, requestBody, { headers });
  }

  putTag(id: string, requestBody): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.put<any>(this.tagPaths  + id, requestBody, { headers });
  }

  deleteTag(id: string): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.delete(this.tagPaths + id, { headers });
  }

  checkDuplicateCode(check): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.tagPaths + 'duplicate-code' + check, { headers });
  }
}
