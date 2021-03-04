import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ItUserService {
  constructor(private http: HttpClient) {}

  getLookupUsers(extsearch: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      lookupusers: extsearch,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/lookupssn`, postData)
      .toPromise();
  }

  getldapuser(getldapuser: any) {
    const getkmartuser = getldapuser;
    const getsears1user = getldapuser;
    const getsears2user = getldapuser;
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      getldapuser,
      getkmartuser,
      getsears1user,
      getsears2user,
    };
    return this.http.post<any>(`${BACKEND_URL}/ask`, postData).toPromise();
  }

  getlookupres(extsearch: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      lookupres: extsearch,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/lookupres`, postData)
      .toPromise();
  }
}
