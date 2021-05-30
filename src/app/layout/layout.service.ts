import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import { LayoutModalComponent } from './layout-modal/layout-modal.component';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  errorModalRef: NgbModalRef;

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService
  ) {}

  getLeftMenuJson() {
    return this.http.get<any>('./assets/sample/menu.json').pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  setLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  doLogout(): void {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  searchuid(post) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      searchuid: post,
    };
    return this.http.post<any>(`${BACKEND_URL}/renameid`, postData).toPromise();
  }

  searchEnterpriseId(enterpriseid) {
    const postData = {
      svc_uid: 'lkarlin',
      svc_pw: 'test@123',
      enterpriseid
    };
    return this.http.post<any>(`${BACKEND_URL}/utils`, postData).toPromise();
  }

  handleResponseError() {
    // this.errorModalRef = this.modalService.open(LayoutModalComponent, {
    //   size: 'sm',
    //   backdrop: 'static',
    // });
    // this.errorModalRef.componentInstance.userName = 'there';
    // this.errorModalRef.componentInstance.content = `Session expired. Please login again.`;
    // localStorage.clear();
    // this.errorModalRef.result.then(
    //   (result) => {
    //     this.router.navigate(['/auth']);
    //   },
    //   (response) => {
    //     this.router.navigate(['/auth']);
    //   }
    // );

    this.toastr.clear();
    localStorage.clear();
    Swal.fire({
      icon: 'error',
      title: `Session expired. Please login again.`,
    }).then(res => {
      this.router.navigate(['/auth']);
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The response body may contain clues as to what went wrong,
      return throwError(error);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
