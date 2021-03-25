import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UnixService {

  constructor(private http: HttpClient) { }

  unixprofile(post) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      unixprofile: post,
    };
    return this.http.post<any>(`${BACKEND_URL}/unixprofile`, postData).toPromise();
  }
}
