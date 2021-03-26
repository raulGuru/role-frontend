import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UnixService {
  constructor(private http: HttpClient) {}

  unixprofile(post) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      unixprofile: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixprofile`, postData)
      .toPromise();
  }

  addunixgroup(post) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'Nevin@12',
      addunixgroup: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixgroup`, postData)
      .toPromise();
  }

  unixgroupsearch(post) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'Nevin@12',
      unixgroupsearch: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixgroup`, postData)
      .toPromise();
  }

  groupdetails(post) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'Nevin@12',
      groupdetails: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixgroup`, postData)
      .toPromise();
  }

  unixgroupusers(post) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'Nevin@12',
      unixgroupusers: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixgroup`, postData)
      .toPromise();
  }

  deleteunixgroup(post) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'Nevin@12',
      deleteunixgroup: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixgroup`, postData)
      .toPromise();
  }
}
