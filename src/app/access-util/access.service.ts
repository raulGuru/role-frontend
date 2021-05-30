import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AccessService {
  constructor(private http: HttpClient) {}

  getUserRoles(opuid: string) {
    const postData = {
      userroles: {
        opuid,
      },
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
    };
    return this.http.post<any>(`${BACKEND_URL}/role`, postData).toPromise();
  }

  getAllRoles() {
    const postData = {
      allroles: '1',
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
    };
    return this.http.post<any>(`${BACKEND_URL}/role`, postData).toPromise();
  }

  modifyRole(action: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      action,
    };
    return this.http.post<any>(`${BACKEND_URL}/role`, postData).toPromise();
  }

  rolesearch(rolesearch: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      rolesearch
    };
    return this.http.post<any>(`${BACKEND_URL}/role`, postData).toPromise();
  }

  roledef(roledef: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      roledef
    };
    return this.http.post<any>(`${BACKEND_URL}/role`, postData).toPromise();
  }

  groupsearch(groupsearch: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      groupsearch
    };
    return this.http.post<any>(`${BACKEND_URL}/group`, postData).toPromise();
  }

  groupdef(groupdef: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      groupdef
    };
    return this.http.post<any>(`${BACKEND_URL}/group`, postData).toPromise();
  }

  groupusers(groupusers: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      groupusers
    };
    return this.http.post<any>(`${BACKEND_URL}/group`, postData).toPromise();
  }

  dlsearch(dlsearch: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      dlsearch
    };
    return this.http.post<any>(`${BACKEND_URL}/dl`, postData).toPromise();
  }

  dldef(dldef: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      dldef
    };
    return this.http.post<any>(`${BACKEND_URL}/dl`, postData).toPromise();
  }

  roleusers(roleusers: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      roleusers
    };
    return this.http.post<any>(`${BACKEND_URL}/role`, postData).toPromise();
  }

  dlusers(dlusers: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      dlusers
    };
    return this.http.post<any>(`${BACKEND_URL}/dl`, postData).toPromise();
  }

  getUserGroups(opuid: string) {
    const postData = {
      usergroups: {
        opuid,
      },
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
    };
    return this.http.post<any>(`${BACKEND_URL}/group`, postData).toPromise();
  }

  getAllGroups() {
    const postData = {
      allgroups: '1',
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
    };
    return this.http.post<any>(`${BACKEND_URL}/group`, postData).toPromise();
  }

  modifyGroup(action: any) {
    const postData = {
      svc_uid: 'nchilka',
      svc_pw: 'test@123',
      action,
    };
    return this.http.post<any>(`${BACKEND_URL}/group`, postData).toPromise();
  }
}
