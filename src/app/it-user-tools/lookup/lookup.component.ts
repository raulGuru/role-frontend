import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { ItUserService } from '../it-user.service';
import { LayoutService } from 'src/app/layout/layout.service';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss'],
})
export class LookupComponent implements OnInit {
  lookupForm: FormGroup;
  loadContent: boolean = false;
  forceServerSearch: boolean = false;
  pageid: number = 1;
  users: any = [];
  ogUsers: any = [];
  searchTxtDisabled: boolean = true;
  searchColmn: string = '';
  txtSearchTbl: string = '';
  searchBtnDisabled: boolean = true;
  searchText: string = '';
  tablesearch: any = {};

  constructor(
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.lookupForm = new FormGroup(
      {
        uid: new FormControl(''),
        givenname: new FormControl(''),
        sn: new FormControl(''),
        mail: new FormControl(''),
        createtimestamp: new FormControl(''),
        emplid: new FormControl(''),
        ssn: new FormControl(''),
        altuid: new FormControl(''),
        procid: new FormControl(''),
        o: new FormControl(''),
      },
      { validators: this.atLeastOneValue }
    );
  }

  ngOnInit(): void {}

  async onLookupSubmit() {
    if (this.lookupForm.valid && this.lookupForm.value) {
      let tablesearch = this.lookupForm.value;
      Object.keys(tablesearch).forEach((key) =>
        tablesearch[key] === '' ? delete tablesearch[key] : {}
      );
      let extsearch = {};
      extsearch['tablesearch'] = tablesearch;
      this.tablesearch = tablesearch;
      const postData = { extsearch };
      this.toastr.clear();
      this.toastr.info('Searching...', 'User Search', {
        disableTimeOut: true,
      });
      try {
        let userRes = await this.itUserService.getLookupUsers(postData);
        if (userRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const {
          status,
          message,
          forceServerSearch,
          pageid,
        } = userRes.header.lookupusers;
        if (status === '0') {
          this.loadContent = true;
          this.forceServerSearch = forceServerSearch;
          this.pageid = pageid;
          this.users = userRes.data.lookupusers;
          this.ogUsers = userRes.data.lookupusers;
        } else {
          Swal.fire({
            icon: 'error',
            title: message,
          });
        }
      } catch (error) {
        this.toastr.clear();
        window.alert(error);
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'At least one field is required!!',
      });
    }
  }

  async searchTblBtn(val: string) {
    if (this.forceServerSearch) {
      let tblFilter = {};
      tblFilter[this.searchColmn] = val;
      let tablesearch = Object.assign(this.tablesearch, tblFilter);
      let extsearch = {};
      extsearch['tablesearch'] = tablesearch;
      const usersReq = { extsearch };
      try {
        let res = await this.itUserService.getLookupUsers(usersReq);
        if (res.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, forceServerSearch } = res.header.lookupusers;
        if (status === '0') {
          // this.loadContent = true;
          // this.forceServerSearch = forceServerSearch;
          this.users = res.data.lookupusers;
        } else {
          Swal.fire({
            icon: 'error',
            title: message,
          });
        }
      } catch (error) {
        window.alert(error);
      }
    } else {
      val = val.toLowerCase();
      this.users = this.users.filter((el) => {
        return el[this.searchColmn].toLowerCase().includes(val);
      });
    }
  }

  async paginateTbl(direction: string) {
    const pageid = direction === 'nxt' ? this.pageid + 1 : this.pageid - 1;
    let extsearch = {
      pageid,
    };
    let tablesearch = {};
    if (this.searchColmn && this.txtSearchTbl) {
      let tblFilter = {};
      tblFilter[this.searchColmn] = this.txtSearchTbl;
      tablesearch = Object.assign(this.tablesearch, tblFilter);
    } else {
      tablesearch = this.tablesearch;
    }
    extsearch['tablesearch'] = tablesearch;
    const usersReq = { extsearch };
    try {
      let res = await this.itUserService.getLookupUsers(usersReq);
      if (res.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const {
        status,
        message,
        forceServerSearch,
        pageid,
      } = res.header.lookupusers;
      if (status === '0') {
        this.pageid = pageid;
        this.users = res.data.lookupusers;
        document.getElementById('loopuptable').scrollIntoView();
      } else {
        Swal.fire({
          icon: 'error',
          title: message,
        });
      }
    } catch (error) {
      window.alert(error);
    }
  }

  searchSelect(val: string) {
    this.searchTxtDisabled = val ? false : true;
    if (val) {
      this.searchColmn = val;
    }
  }

  searchTxtkey(val: string) {
    this.pageid = 1;
    this.txtSearchTbl = val;
    if (val) {
      this.searchBtnDisabled = false;
    } else {
      this.users = this.ogUsers;
      this.searchBtnDisabled = true;
      return;
    }
  }

  clearForm() {
    this.lookupForm.reset();
  }

  atLeastOneValue(form: FormGroup): ValidationErrors {
    return Object.keys(form.value).some((key) => !!form.value[key])
      ? null
      : { atLeastOneValue: 'At least one field is required!!' };
  }
}
