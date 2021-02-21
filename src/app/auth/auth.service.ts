import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthData } from './auth-data.model';

const BACKEND_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(enterpriseId: string, password: string) {
    const authData: AuthData = {
      uid: enterpriseId,
      pw: password,
      attrs: ['cn', 'title'],
      mode: 'f',
    };
    return this.http
      .post<any>(`${BACKEND_URL}/bind`, authData)
      .toPromise();
  }

  setLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getUserMenu() {
    return JSON.parse(localStorage.getItem('userMenu'));
  }
}
