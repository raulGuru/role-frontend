import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { AccessService } from '../access.service';
import { LayoutService } from 'src/app/layout/layout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dl-view',
  templateUrl: './dl-view.component.html',
  styleUrls: ['./dl-view.component.scss'],
})
export class DlViewComponent implements OnInit {
  searchText: string;
  loadContent: boolean = false;
  dldef: any;
  dls: [];

  constructor(
    private accessService: AccessService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  async findDls(event: any) {
    if (event.term.length < 3) {
      return false;
    }
    this.toastr.clear();
    this.toastr.info('Searching...', 'DL Search', {
      disableTimeOut: true,
    });
    this.loadContent = false;
    const searchPost = { dlsearchstr: event.term };
    try {
      let searchRes = await this.accessService.dlsearch(searchPost);
      if (searchRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message } = searchRes.header.dlsearch;
      if (status === '0') {
        this.dls = searchRes.data.dlsearch;
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

  async getDlDef() {
    if (this.searchText.length < 3) return;
    this.toastr.clear();
    const dlstr = this.searchText;
    this.loadContent = false;
    this.toastr.info('Requesting...', 'DL Search', {
      disableTimeOut: true,
    });
    const defReq = { dlstr };
    try {
      let res = await this.accessService.dldef(defReq);
      if (res.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message } = res.header.dldef;
      if (status === '0') {
        this.loadContent = true;
        this.dldef = res.data.dldef;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
