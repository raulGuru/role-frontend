import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { AccessService } from '../access.service';

@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.scss']
})
export class GroupSearchComponent implements OnInit {
  searchText: string = '';
  groupSearchData: any = [];
  loadContent: boolean = false;
  groupUsers: any = [];
  ogGroupUsers: any = [];
  searchTxtDisabled: boolean = true;
  searchBtnDisabled: boolean = true;
  searchColmn: string = '';
  txtSearchTbl: string = '';
  forceServerSearch: boolean = false;
  pageid: number = 1;

  constructor(
    private accessService: AccessService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  async findGroups(groupsearchstr: string) {
    this.groupSearchData = [];
    if (groupsearchstr.length < 3) {
      return false;
    }
    this.toastr.clear();
    this.resetGroupUsers()
    this.toastr.info('Searching...', 'Group Search', {
      disableTimeOut: true,
    });
    const searchPost = { groupsearchstr };
    try {
      let searchRes = await this.accessService.groupsearch(searchPost);
      if (searchRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message } = searchRes.header.groupsearch;
      if (status === '0') {
        const resData = searchRes.data.groupsearch;
        if (resData.length > 0) {
          this.groupSearchData = resData;
        } else {
          this.toastr.error('No result(s)!', 'Group Search', {
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
      console.log(error);
    }
  }

  resetGroupUsers() {
    this.groupSearchData = [];
    this.loadContent = false;
    this.forceServerSearch = false;
    this.pageid = 1;
    this.groupUsers = [];
    this.ogGroupUsers = [];
  }

  async getGroupUsers(groupstr: string) {
    this.toastr.clear();
    this.searchText = groupstr;
    this.resetGroupUsers()
    this.toastr.info('Requesting...', 'Group Search', {
      disableTimeOut: true,
    });
    const usersReq = { groupstr };
    try {
      let res = await this.accessService.groupusers(usersReq);
      if (res.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const {
        status,
        message,
        forceServerSearch,
        pageid,
      } = res.header.groupusers;
      if (status === '0') {
        this.loadContent = true;
        this.forceServerSearch = forceServerSearch;
        this.pageid = pageid;
        this.groupUsers = res.data.groupusers;
        this.ogGroupUsers = res.data.groupusers;
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
      this.groupUsers = this.ogGroupUsers;
      this.searchBtnDisabled = true;
      return;
    }
  }

  async searchTblBtn(val: string) {
    if (this.forceServerSearch) {
      let tablesearch = {};
      tablesearch[this.searchColmn] = val;
      const usersReq = {
        groupstr: this.searchText,
        extsearch: { tablesearch },
      };
      try {
        let res = await this.accessService.groupusers(usersReq);
        if (res.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, forceServerSearch } = res.header.groupusers;
        if (status === '0') {
          // this.loadContent = true;
          // this.forceServerSearch = forceServerSearch;
          this.groupUsers = res.data.groupusers;
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
      this.groupUsers = this.groupUsers.filter((el) => {
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
      groupstr: this.searchText,
      extsearch,
    };
    try {
      let res = await this.accessService.groupusers(usersReq);
      if (res.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const {
        status,
        message,
        forceServerSearch,
        pageid,
      } = res.header.groupusers;
      if (status === '0') {
        this.pageid = pageid;
        this.groupUsers = res.data.groupusers;
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
