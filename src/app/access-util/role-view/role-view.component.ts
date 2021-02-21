import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { AccessService } from '../access.service';
import { LayoutService } from 'src/app/layout/layout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-view',
  templateUrl: './role-view.component.html',
  styleUrls: ['./role-view.component.scss'],
})
export class RoleViewComponent implements OnInit {
  searchText: string = '';
  roleSearchData: any = [];
  loadContent: boolean = false;
  roledef: any;

  constructor(
    private accessService: AccessService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  async findRoles(rolesearchstr: string) {
    this.roleSearchData = [];
    if (rolesearchstr.length < 3) {
      return false;
    }
    this.toastr.clear();
    this.toastr.info('Searching...', 'Role Search', {
      disableTimeOut: true,
    });
    this.loadContent = false;
    const searchPost = { rolesearchstr };
    try {
      let searchRes = await this.accessService.rolesearch(searchPost);
      if (searchRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message } = searchRes.header.rolesearch;
      if (status === '0') {
        const resData = searchRes.data.rolesearch;
        if (resData.length > 0) {
          this.roleSearchData = resData;
        } else {
          this.toastr.error('No result(s)!', 'Role Search', {
            timeOut: 2000,
          });
        }
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
  }

  async getRoleDef(rolestr: string) {
    this.toastr.clear();
    this.searchText = rolestr;
    this.roleSearchData = [];
    this.loadContent = false;
    this.toastr.info('Requesting...', 'Role Search', {
      disableTimeOut: true,
    });
    const defReq = { rolestr };
    try {
      let res = await this.accessService.roledef(defReq);
      if (res.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message } = res.header.roledef;
      if (status === '0') {
        this.loadContent = true;
        this.roledef = res.data.roledef;
      }
    } catch (error) {
      window.alert(error);
    }
  }

  getNestingRole(role: string) {
    this.getRoleDef(role);
  }

  arrayToLine(arr) {
    return arr.join('<br>');
  }
}
