import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { ItUserService } from '../it-user.service';

@Component({
  selector: 'app-lookup-password',
  templateUrl: './lookup-password.component.html',
  styleUrls: ['./lookup-password.component.scss'],
})
export class LookupPasswordComponent implements OnInit {
  loadContent: boolean = false;
  ldapArr: any = [];
  sears1Arr: any = [];
  sears2Arr: any = [];
  kmartArr: any = [];
  amArr: any = [];

  constructor(
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  async onUidClosed(opuid) {
    if (opuid) {
      this.loadContent = false;
      this.ldapArr = [];
      this.toastr.clear();
      this.toastr.info('Searching...', 'Enterprise ID Search', {
        disableTimeOut: true,
      });
      try {
        let ldapRes = await this.itUserService.getldappasswordinfo(
          { opuid }
        );
        if (ldapRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message } = ldapRes.header.getldappasswordinfo;
        if (status === '0') {
          this.loadContent = true;
          this.ldapArr = ldapRes.data.getldappasswordinfo;

          this.itUserService
            .getsears1passwordinfo({ opuid })
            .then((res) => {
              if (res.header.status == '1') {
                this.layoutService.handleResponseError();
              }
              const { status, message } = res.header.getsears1passwordinfo;
              if (status === '0') {
                this.sears1Arr = res.data.getsears1passwordinfo;
              } else {
                // Swal.fire({
                //   icon: 'error',
                //   title: message,
                // });
              }
            });
          this.itUserService
            .getsears2passwordinfo({ opuid })
            .then((res) => {
              if (res.header.status == '1') {
                this.layoutService.handleResponseError();
              }
              const { status, message } = res.header.getsears2passwordinfo;
              if (status === '0') {
                this.sears2Arr = res.data.getsears2passwordinfo;
              } else {
                // Swal.fire({
                //   icon: 'error',
                //   title: message,
                // });
              }
            });
          this.itUserService
            .getkmartpasswordinfo({ opuid })
            .then((res) => {
              if (res.header.status == '1') {
                this.layoutService.handleResponseError();
              }
              const { status, message } = res.header.getkmartpasswordinfo;
              if (status === '0') {
                this.kmartArr = res.data.getkmartpasswordinfo;
              } else {
                // Swal.fire({
                //   icon: 'error',
                //   title: message,
                // });
              }
            });
          this.itUserService
            .gettampasswordinfo({ opuid })
            .then((res) => {
              if (res.header.status == '1') {
                this.layoutService.handleResponseError();
              }
              const { status, message } = res.header.gettampasswordinfo;
              if (status === '0') {
                this.amArr = res.data.gettampasswordinfo;
              } else {
                // Swal.fire({
                //   icon: 'error',
                //   title: message,
                // });
              }
            });
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
  }
}
