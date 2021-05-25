import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { AuthData } from './auth-data.model';

const BACKEND_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,) { }

  login(enterpriseId: string, password: string) {
    const authData: AuthData = {
      uid: enterpriseId,
      pw: password,
      attrs: ['cn', 'title', 'uid'],
      mode: 'f',
    };
    return this.http
      .post<any>(`${BACKEND_URL}/bind`, authData)
      .toPromise();
  }

  getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  setLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getUserMenu() {
    return JSON.parse(localStorage.getItem('userMenu'));
  }

  getuserprofile() {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      getuserprofile: true
    };
    return this.http
      .post<any>(`${BACKEND_URL}/userprofile`, postData)
      .toPromise();
  }

  updateProfile(userprofile: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      userprofile
    };
    return this.http
      .post<any>(`${BACKEND_URL}/userprofile`, postData)
      .toPromise();
  }

  changepassword(changepassword: any) {
    const postData = {
      changepassword
    };
    return this.http
      .post<any>(`${BACKEND_URL}/changepassword`, postData)
      .toPromise();
  }

  resetpassword(resetpassword: any) {
    const postData = {
      resetpassword
    };
    return this.http
      .post<any>(`${BACKEND_URL}/resetpassword`, postData)
      .toPromise();
  }

  registerpassphrase(registerpassphrase: any) {
    const postData = {
      registerpassphrase
    };
    return this.http
      .post<any>(`${BACKEND_URL}/registerpassphrase`, postData)
      .toPromise();
  }

  enterpriseLookup(extsearch: any) {
    const postData = {
      lookupuid: extsearch,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/lookupuid`, postData)
      .toPromise();
  }

  doLogout(): void {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  handleResponseError() {
    localStorage.clear();
    Swal.fire({
      icon: 'error',
      title: `Session expired. Please login again.`,
    }).then(res => {
      this.router.navigate(['/auth']);
    });
  }
}
