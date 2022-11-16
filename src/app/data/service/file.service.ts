import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { File } from '../schema/file';
import { ApiProviderService } from 'src/app/core/service/api-provider.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient, private apiProvider: ApiProviderService) { }

  getFiles(): Observable<File[]> {
    let baseURL: string = this.apiProvider.getUrl('digo', 'fileman');
    return this.http.get<File[]>(baseURL);
  }
  
}
