import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-id-lookup',
  templateUrl: './id-lookup.component.html',
  styleUrls: ['./id-lookup.component.scss']
})
export class IdLookupComponent implements OnInit {
  isLoggedIn: boolean = false;
  lookupForm: FormGroup;
  loadContent: boolean = false;
  forceServerSearch: boolean = false;
  pageid: number = 1;
  users: any = [];
  tablesearch: any = {};

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.lookupForm = new FormGroup({
      sn: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getLocalStorage('user');
  }

  onSubmit() {
    if (this.lookupForm.valid && this.lookupForm.value) {
      let tablesearch = this.lookupForm.value;
      Object.keys(tablesearch).forEach((key) =>
        tablesearch[key] === '' || tablesearch[key] === null
          ? delete tablesearch[key]
          : {}
      );
      this.tablesearch = tablesearch;
      let extsearch = {};
      extsearch['tablesearch'] = tablesearch;
      const postData = { extsearch };
      this.getLookupRes(postData);
    } else {
      Swal.fire({
        icon: 'info',
        title: 'At least one field is required!!',
      });
    }
  }

  async getLookupRes(postData: any) {
    this.loadContent = false;
    this.users = [];
    this.toastr.clear();
    this.toastr.info('Searching...', 'User Search', {
      disableTimeOut: true,
    });
    try {
      let lookupres = await this.authService.enterpriseLookup(postData);
      if (lookupres.header.status == '1') {
        this.authService.handleResponseError();
      }
      this.toastr.clear();
      const {
        status,
        message,
        forceServerSearch,
        pageid,
      } = lookupres.header.lookupuid;
      if (status === '0') {
        this.loadContent = true;
        this.forceServerSearch = forceServerSearch;
        this.pageid = pageid;
        this.users = lookupres.data.lookupuid;
      } else {
        Swal.fire({
          icon: 'error',
          title: message,
        });
      }
    } catch (error) {
      this.toastr.clear();
      console.log(error);
    }
  }

  paginateTbl(direction: string) {
    const pageid = direction === 'nxt' ? this.pageid + 1 : this.pageid - 1;
    let extsearch = {
      pageid,
    };
    extsearch['tablesearch'] = this.tablesearch;
    const usersReq = { extsearch };
    this.getLookupRes(usersReq);
  }

  get c() {
    return this.lookupForm.controls;
  }

}
