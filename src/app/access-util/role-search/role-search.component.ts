import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { AccessService } from '../access.service';
import { LayoutService } from 'src/app/layout/layout.service';

@Component({
  selector: 'app-role-search',
  templateUrl: './role-search.component.html',
  styleUrls: ['./role-search.component.scss'],
})
export class RoleSearchComponent implements OnInit {
  searchText: string;
  loadContent: boolean = false;
  roleUsers: any = [];
  ogRoleUsers: any = [];
  searchTxtDisabled: boolean = true;
  searchBtnDisabled: boolean = true;
  searchColmn: string = '';
  txtSearchTbl: string = '';
  forceServerSearch: boolean = false;
  pageid: number = 1;
  roles: [];

  constructor(
    private accessService: AccessService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  async findRoles(event: any) {
    if (event.term.length < 3) {
      return false;
    }
    this.toastr.clear();
    this.resetRoleUsers()
    this.toastr.info('Searching...', 'Role Search', {
      disableTimeOut: true,
    });
    const searchPost = { rolesearchstr: event.term };
    try {
      let searchRes = await this.accessService.rolesearch(searchPost);
      if (searchRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message } = searchRes.header.rolesearch;
      if (status === '0') {
        this.roles = searchRes.data.rolesearch;
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

  resetRoleUsers() {
    this.loadContent = false;
    this.forceServerSearch = false;
    this.pageid = 1;
    this.roleUsers = [];
    this.ogRoleUsers = [];
  }

  async getRoleUsers() {
    if (this.searchText.length < 3) return;
    this.toastr.clear();
    this.resetRoleUsers();
    const rolestr = this.searchText;
    this.toastr.info('Requesting...', 'Role Search', {
      disableTimeOut: true,
    });
    const usersReq = { rolestr };
    try {
      let res = await this.accessService.roleusers(usersReq);
      if (res.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const {
        status,
        message,
        forceServerSearch,
        pageid,
      } = res.header.roleusers;
      if (status === '0') {
        this.loadContent = true;
        this.forceServerSearch = forceServerSearch;
        this.pageid = pageid;
        this.roleUsers = res.data.roleusers;
        this.ogRoleUsers = res.data.roleusers;
      } else {
        Swal.fire({
          icon: 'error',
          title: message,
        });
      }
    } catch (error) {
      console.log(error);
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
      this.roleUsers = this.ogRoleUsers;
      this.searchBtnDisabled = true;
      return;
    }
  }

  async searchTblBtn(val: string) {
    if (this.forceServerSearch) {
      let tablesearch = {};
      tablesearch[this.searchColmn] = val;
      const usersReq = {
        rolestr: this.searchText,
        extsearch: { tablesearch },
      };
      try {
        let res = await this.accessService.roleusers(usersReq);
        if (res.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, forceServerSearch } = res.header.roleusers;
        if (status === '0') {
          // this.loadContent = true;
          // this.forceServerSearch = forceServerSearch;
          this.roleUsers = res.data.roleusers;
        } else {
          Swal.fire({
            icon: 'error',
            title: message,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      val = val.toLowerCase();
      this.roleUsers = this.roleUsers.filter((el) => {
        return el[this.searchColmn].toLowerCase().includes(val);
      });
    }
  }

  async paginateTbl(direction: string) {
    const pageid = direction === 'nxt' ? this.pageid + 1 : this.pageid - 1;
    let extsearch = {
      pageid,
    };
    if (this.searchColmn && this.txtSearchTbl) {
      let tablesearch = {};
      tablesearch[this.searchColmn] = this.txtSearchTbl;
      extsearch['tablesearch'] = tablesearch;
    }
    const usersReq = {
      rolestr: this.searchText,
      extsearch,
    };
    try {
      let res = await this.accessService.roleusers(usersReq);
      if (res.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const {
        status,
        message,
        forceServerSearch,
        pageid,
      } = res.header.roleusers;
      if (status === '0') {
        this.pageid = pageid;
        this.roleUsers = res.data.roleusers;
        document.getElementById("loadContent").scrollIntoView();
      } else {
        Swal.fire({
          icon: 'error',
          title: message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
