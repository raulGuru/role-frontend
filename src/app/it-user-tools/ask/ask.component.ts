import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import { LayoutService } from 'src/app/layout/layout.service';
import { ItUserService } from '../it-user.service';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss'],
})
export class AskComponent implements OnInit, OnDestroy {
  loadContent: boolean = false;
  ldapuser: any = [];
  kmartuser: any = [];
  sears1user: any = [];
  sears2user: any = [];
  searchUid: string = '';
  searchHistory: any = [];

  constructor(
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.clearHistory();
  }

  onAskSubmit(form: NgForm) {
    const opuid = form.value.opuid;
    if (opuid) {
      this.clearHistory();
      this.searchUid = opuid;
      this.renderLdapUser(opuid);
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Enter Enterprise ID to search!!',
      });
    }
  }

  async renderLdapUser(uid: string) {
    this.toastr.clear();
    this.toastr.info('Searching...', 'User Search', {
      disableTimeOut: true,
    });
    this.loadContent = false;
    this.ldapuser = [];
    this.kmartuser = [];
    this.sears1user = [];
    this.sears2user = [];
    try {
      const post = { opuid: uid };
      let res = await this.itUserService.getldapuser(post);
      if (res.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message } = res.header.getldapuser;
      if (status === '0') {
        this.loadContent = true;
        this.ldapuser = res.data.getldapuser;
      } else {
        Swal.fire({
          icon: 'error',
          title: message,
        });
      }
      const kmartStatus = res.header.getkmartuser.status;
      const sears1Status = res.header.getsears1user.status;
      const sears2Status = res.header.getsears2user.status;
      if (kmartStatus !== '0' || sears1Status !== '0' || sears2Status !== '0') {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
        });
      } else {
        this.kmartuser = res.data.getkmartuser;
        this.sears1user = res.data.getsears1user;
        this.sears2user = res.data.getsears2user;
      }
    } catch (error) {
      this.toastr.clear();
      window.alert(error);
    }
  }

  getManagerDetails(uid: string) {
    this.searchHistory = this.layoutService.getLocalStorage('askSearch') || [];
    if (this.searchHistory.length === 0) {
      this.searchHistory.push(this.searchUid);
    }
    this.searchHistory.push(uid);
    this.layoutService.setLocalStorage('askSearch', this.searchHistory);
    this.renderLdapUser(uid);
  }

  clearHistory(): void {
    this.searchHistory = [];
    localStorage.removeItem('askSearch');
  }

  ngOnDestroy() {
    localStorage.removeItem('askSearch');
  }
}
