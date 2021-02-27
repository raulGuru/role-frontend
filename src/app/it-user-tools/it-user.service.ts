import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ItUserService {
  constructor(private http: HttpClient) {}

  getLookupUsers(data: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      lookupusers: {
        extsearch: data,
      },
    };
    return this.http
      .post<any>(`${BACKEND_URL}/lookupssn`, postData)
      .toPromise();
  }
}
