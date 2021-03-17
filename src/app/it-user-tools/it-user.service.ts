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

  getldappasswordinfo(getldappasswordinfo: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      getldappasswordinfo,
    };
    return this.http.post<any>(`${BACKEND_URL}/lookuppw`, postData).toPromise();
  }

  getsears1passwordinfo(getsears1passwordinfo: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      getsears1passwordinfo,
    };
    return this.http.post<any>(`${BACKEND_URL}/lookuppw`, postData).toPromise();
  }

  getsears2passwordinfo(getsears2passwordinfo: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      getsears2passwordinfo,
    };
    return this.http.post<any>(`${BACKEND_URL}/lookuppw`, postData).toPromise();
  }

  getkmartpasswordinfo(getkmartpasswordinfo: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      getkmartpasswordinfo,
    };
    return this.http.post<any>(`${BACKEND_URL}/lookuppw`, postData).toPromise();
  }

  gettampasswordinfo(gettampasswordinfo: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      gettampasswordinfo,
    };
    return this.http.post<any>(`${BACKEND_URL}/lookuppw`, postData).toPromise();
  }

  getresuser(opuid: any) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      getresuser: {
        opuid,
      },
    };
    return this.http
      .post<any>(`${BACKEND_URL}/reserveuser`, postData)
      .toPromise();
  }

  generateuid(givenname: string, sn: string) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      generateuid: {
        givenname,
        sn,
      },
    };
    return this.http
      .post<any>(`${BACKEND_URL}/reserveuser`, postData)
      .toPromise();
  }

  reserveuser(post) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      reserveuser: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/reserveuser`, postData)
      .toPromise();
  }

  altuid(post) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      altuid: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/altuid`, postData)
      .toPromise();
  }

  getorgs(post) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      getorgs: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/nonassociate`, postData)
      .toPromise();
  }

  getnonassociate(post) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      getnonassociate: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/nonassociate`, postData)
      .toPromise();
  }

  nonassociate(post) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      nonassociate: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/nonassociate`, postData)
      .toPromise();
  }

  changessn(post) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      changessn: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/changessn`, postData)
      .toPromise();
  }

  getBusinessCategories() {
    return this.http
      .get<any>("./assets/sample/business-categories.json").toPromise()
  }

  getBusinessUnits() {
    return this.http
      .get<any>("./assets/sample/business-units.json").toPromise()
  }

  getContractors(post) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      getnonassociate: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/convertcontractor`, postData)
      .toPromise();
  }

  getAssociates(post) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      getassociate: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/convertcontractor`, postData)
      .toPromise();
  }

  convertcontractor(post) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      convertcontractor: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/convertcontractor`, postData)
      .toPromise();
  }

  searchuid(post) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      searchuid: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/renameid`, postData)
      .toPromise();
  }

  renameid(post) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      renameid: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/renameid`, postData)
      .toPromise();
  }

  getPhoneCodes() {
    return this.http
      .get<any>("./assets/sample/country-phonecodes.json").toPromise()
  }

  getvendor(post) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      getvendor: post,
    };
    return this.http
      .post<any>(`${BACKEND_URL}/vendor`, postData)
      .toPromise();
  }
}
