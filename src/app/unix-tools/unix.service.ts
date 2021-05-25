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
      svc_pw: 'test@123',
      addunixgroup: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixgroup`, postData)
      .toPromise();
  }

  unixgroupsearch(post) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
      unixgroupsearch: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixgroup`, postData)
      .toPromise();
  }

  groupdetails(post) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
      groupdetails: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixgroup`, postData)
      .toPromise();
  }

  unixgroupusers(post) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
      unixgroupusers: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixgroup`, postData)
      .toPromise();
  }

  deleteunixgroup(post) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
      deleteunixgroup: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixgroup`, postData)
      .toPromise();
  }

  getUserGroups(opuid: string) {
    const postData = {
      userunixgroups: {
        opuid,
      },
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixgroup`, postData)
      .toPromise();
  }

  getAllGroups() {
    const postData = {
      allunixgroups: '1',
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixgroup`, postData)
      .toPromise();
  }

  modifyGroup(action: any) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
      action,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixgroup`, postData)
      .toPromise();
  }

  addunixnetgroup(post) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
      addunixnetgroup: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixnetgroup`, postData)
      .toPromise();
  }

  unixnetgroupsearch(post) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
      unixnetgroupsearch: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixnetgroup`, postData)
      .toPromise();
  }

  netgroupdetails(post) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
      netgroupdetails: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixnetgroup`, postData)
      .toPromise();
  }

  deleteunixnetgroup(post) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
      deleteunixnetgroup: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixnetgroup`, postData)
      .toPromise();
  }

  unixnetgroupusers(post) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
      unixnetgroupusers: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixnetgroup`, postData)
      .toPromise();
  }

  getUserNetGroups(opuid: string) {
    const postData = {
      userunixnetgroups: {
        opuid,
      },
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixnetgroup`, postData)
      .toPromise();
  }

  getAllNetGroups(type: string) {
    const postData = {
      allunixnetgroups: {
        type,
      },
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixnetgroup`, postData)
      .toPromise();
  }

  modifyNetGroup(action: any) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
      action,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixnetgroup`, postData)
      .toPromise();
  }

  modifyHostNetGrp(action: any) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
      action,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/unixnetgroup`, postData)
      .toPromise();
  }
}
