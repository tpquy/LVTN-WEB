import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiProviderService } from 'src/app/core/service/api-provider.service';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/core/service/env.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private envService: EnvService,
    private http: HttpClient,
    private apiProviderService: ApiProviderService
  ) { }

  // getFiles(): Observable<File[]> {
  //   let baseURL: string = this.apiProvider.getUrl('digo', 'fileman');
  //   return this.http.get<File[]>(baseURL);
  // }

  // private filePath = this.apiProviderService.getUrl('digo', 'fileman')+'/file/';
  private filePath = 'http://localhost:8080/file/';


  getFileDetail(id): Observable<any> {
    return this.http.get(this.filePath  + id + '/filename+size');
  }


  downloadFile(id): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'OAuth 2.0' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.filePath + id, { responseType: 'blob' as 'json' }).pipe();
  }

  deleteFile(id) {
    return this.http.delete<any>(this.filePath + id).pipe();
  }


  uploadFile(formData): Observable<any> {
    return this.http.post(this.filePath, formData).pipe();
  }

  downloadFileByUrl(url): Observable<any> {
    return this.http.get(url, { responseType: 'blob' as 'json' }).pipe();
  }

  renameFile(id, name): Observable<any> {
    return this.http.put(this.filePath+'/'+id+'/rename?name='+name, null).pipe();
  }

  uploadMultiFile(imgFiles, accountId): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    const formData: FormData = new FormData();
    imgFiles.forEach(files => {
      const file: File = files;
      formData.append('files', file, file.name);
    });
    // formData.append('account-id', accountId);
    return this.http.post<any>(this.filePath + '--multiple', formData, { headers });
  }

  getFileNameSize(id): Observable<any> {
    const token = localStorage.getItem('OAuth2TOKEN');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'OAuth 2.0' + token);
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept-Language', localStorage.getItem('language'));
    return this.http.get(this.filePath + id + '/filename+size', { headers });
  }

  uploadFiles(imgFile): Observable<any> {
    const formData: FormData = new FormData();
    const file: File = imgFile;
    formData.append('file', file, file.name);
    return this.http.post(this.filePath, formData).pipe();
  }
}
