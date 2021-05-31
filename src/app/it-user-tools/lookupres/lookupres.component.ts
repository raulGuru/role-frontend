import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { ItUserService } from '../it-user.service';
import { CustomValidators } from '../../shared/custom.validators';

@Component({
  selector: 'app-lookupres',
  templateUrl: './lookupres.component.html',
  styleUrls: ['./lookupres.component.scss'],
})
export class LookupresComponent implements OnInit {
  lookupresForm: FormGroup;
  loadContent: boolean = false;
  forceServerSearch: boolean = false;
  pageid: number = 1;
  users: any = [];
  tablesearch: any = {};
  clearUidForm: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.lookupresForm = new FormGroup(
      {
        //uid: new FormControl(''),
        emplid: new FormControl(''),
        employeenumber: new FormControl(''),
      },
      { validators: CustomValidators.atLeastOneValue }
    );
  }

  ngOnInit(): void {
    let tablesearch = {
      emplid: '',
      employeenumber: '',
      uid: '',
    };
    this.tablesearch = tablesearch;
    let extsearch = {};
    extsearch['tablesearch'] = tablesearch;
    const postData = { extsearch };
    this.getLookupRes(postData);
  }

  onUidClosed(uid): void {
    if (uid) {
      this.lookupresForm.addControl('uid', new FormControl(uid));
    } else {
      this.lookupresForm.removeControl('uid');
    }
    this.lookupresForm.updateValueAndValidity();
  }

  onUidCleard(isCleard): void {
    this.lookupresForm.removeControl('uid');
    this.lookupresForm.updateValueAndValidity();
  }

  onLookupresSubmit() {
    if (this.lookupresForm.valid && this.lookupresForm.value) {
      let tablesearch = this.lookupresForm.value;
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
      let lookupres = await this.itUserService.getlookupres(postData);
      if (lookupres.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const {
        status,
        message,
        forceServerSearch,
        pageid,
      } = lookupres.header.lookupres;
      if (status === '0') {
        this.loadContent = true;
        this.forceServerSearch = forceServerSearch;
        this.pageid = pageid;
        this.users = lookupres.data.lookupres;
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

  clearForm() {
    this.lookupresForm.reset();
    this.clearUidForm.emit(true);
    this.onUidCleard(true);
  }
}
