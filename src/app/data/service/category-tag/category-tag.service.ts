import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiProviderService } from 'src/app/core/service/api-provider.service';
@Injectable({
  providedIn: 'root'
})
export class CategoryTagService {

  constructor(private http: HttpClient, private apiProviderService: ApiProviderService) { }

  private categoryTagsPath = 'http://localhost:8080' + '/category-tag/';
  getListCategory(searchString): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.categoryTagsPath  + searchString, { headers });
  }

  getDetailCategoryTag(id): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.categoryTagsPath + id, { headers });
  }

  postCategoryTag(requestBody): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.post<any>(this.categoryTagsPath, requestBody, { headers });
  }

  putCategoryTag(id: string, requestBody): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    //headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.put<any>(this.categoryTagsPath + id, requestBody, { headers });
  }

  deleteCategoryTag(id: string): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.delete(this.categoryTagsPath + id, { headers });
  }

  checkDuplicateCode(check): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.categoryTagsPath + 'duplicate-code' + check, { headers });
  }
  
}
