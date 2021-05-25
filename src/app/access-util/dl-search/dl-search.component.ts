import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import { LayoutService } from 'src/app/layout/layout.service';
import { AccessService } from '../access.service';

@Component({
  selector: 'app-dl-search',
  templateUrl: './dl-search.component.html',
  styleUrls: ['./dl-search.component.scss'],
})
export class DlSearchComponent implements OnInit {
  searchText: string = '';
  dlSearchData: any = [];
  loadContent: boolean = false;
  forceServerSearch: boolean = false;
  pageid: number = 1;
  dlUsers: any = [];
  ogDlUsers: any = [];
  searchTxtDisabled: boolean = true;
  searchBtnDisabled: boolean = true;
  searchColmn: string = '';
  txtSearchTbl: string = '';

  constructor(
    private accessService: AccessService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  async findDls(dlsearchstr: string) {
    this.dlSearchData = [];
    if (dlsearchstr.length < 3) {
      return false;
    }
    this.toastr.clear();
    this.resetDlUsers();
    this.toastr.info('Searching...', 'DL Search', {
      disableTimeOut: true,
    });
    const searchPost = { dlsearchstr };
    try {
      let searchRes = await this.accessService.dlsearch(searchPost);
      if (searchRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message } = searchRes.header.dlsearch;
      if (status === '0') {
        const resData = searchRes.data.dlsearch;
        if (resData.length > 0) {
          this.dlSearchData = resData;
        } else {
          this.toastr.error('No result(s)!', 'DL Search', {
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

  resetDlUsers() {
    this.dlSearchData = [];
    this.loadContent = false;
    this.forceServerSearch = false;
    this.pageid = 1;
    this.dlUsers = [];
    this.ogDlUsers = [];
  }

  async getDlUsers(dlstr: string) {
    this.toastr.clear();
    this.resetDlUsers();
    this.searchText = dlstr;
    this.toastr.info('Requesting...', 'DL Search', {
      disableTimeOut: true,
    });
    const usersReq = { dlstr };
    try {
      let res = await this.accessService.dlusers(usersReq);
      if (res.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, forceServerSearch, pageid } = res.header.dlusers;
      if (status === '0') {
        this.loadContent = true;
        this.forceServerSearch = forceServerSearch;
        this.pageid = pageid;
        this.dlUsers = res.data.dlusers;
        this.ogDlUsers = res.data.dlusers;
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
      this.dlUsers = this.ogDlUsers;
      this.searchBtnDisabled = true;
      return;
    }
  }

  async searchTblBtn(val: string) {
    if (this.forceServerSearch) {
      let tablesearch = {};
      tablesearch[this.searchColmn] = val;
      const usersReq = {
        dlstr: this.searchText,
        extsearch: { tablesearch },
      };
      try {
        let res = await this.accessService.dlusers(usersReq);
        if (res.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, forceServerSearch } = res.header.dlusers;
        if (status === '0') {
          // this.loadContent = true;
          // this.forceServerSearch = forceServerSearch;
          this.dlUsers = res.data.dlusers;
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
      this.dlUsers = this.dlUsers.filter((el) => {
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
      dlstr: this.searchText,
      extsearch,
    };
    try {
      let res = await this.accessService.dlusers(usersReq);
      if (res.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, forceServerSearch, pageid } = res.header.dlusers;
      if (status === '0') {
        this.pageid = pageid;
        this.dlUsers = res.data.dlusers;
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
