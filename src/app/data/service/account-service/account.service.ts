import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
  ) { }

  private provincePath = 'https://provinces.open-api.vn/api/';

  getProvinceList(): Observable<any> {
    return this.http.get(this.provincePath);
  }



}
