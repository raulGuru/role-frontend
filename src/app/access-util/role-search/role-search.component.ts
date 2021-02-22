import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { AccessService } from '../access.service';
import { LayoutService } from 'src/app/layout/layout.service';

@Component({
  selector: 'app-role-search',
  templateUrl: './role-search.component.html',
  styleUrls: ['./role-search.component.scss']
})
export class RoleSearchComponent implements OnInit {
  searchText: string = '';
  roleSearchData: any = [];
  loadContent: boolean = false;
  roleUsers: any = [];
  searchUid: string = '';
  searchCn: string = '';

  constructor(
    private accessService: AccessService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

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

  async getRoleUsers(rolestr: string) {
    this.toastr.clear();
    this.searchText = rolestr;
    this.roleSearchData = [];
    this.loadContent = false;
    this.toastr.info('Requesting...', 'Role Search', {
      disableTimeOut: true,
    });
    const usersReq = { rolestr };
    let res = await this.accessService.roleusers(usersReq);
    if (res.header.status == '1') {
      this.layoutService.handleResponseError();
    }
    this.toastr.clear();
    const { status, message, forceServerSearch } = res.header.roleusers;
    if (status === '0') {
      this.loadContent = true;
      this.roleUsers = res.data.roleusers;
    }
    console.log(res);
  }

}
