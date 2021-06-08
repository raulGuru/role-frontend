import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/layout.service';
import Swal from 'sweetalert2';
import { AccessService } from '../access.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {
  searchText: string;
  loadContent: boolean = false;
  groupdef: any;
  groups: [];

  constructor(
    private accessService: AccessService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  async findGroups(event: any) {
    if (event.term.length < 3) {
      return false;
    }
    this.toastr.clear();
    this.toastr.info('Searching...', 'Group Search', {
      disableTimeOut: true,
    });
    this.loadContent = false;
    const searchPost = { groupsearchstr: event.term };
    try {
      let searchRes = await this.accessService.groupsearch(searchPost);
      if (searchRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message } = searchRes.header.groupsearch;
      if (status === '0') {
        this.groups = searchRes.data.groupsearch;
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

  async getGroupDef() {
    if (this.searchText.length < 3) return;
    this.toastr.clear();
    const groupstr = this.searchText;
    this.loadContent = false;
    this.toastr.info('Requesting...', 'Group Search', {
      disableTimeOut: true,
    });
    const defReq = { groupstr };
    try {
      let res = await this.accessService.groupdef(defReq);
      if (res.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message } = res.header.groupdef;
      if (status === '0') {
        this.loadContent = true;
        this.groupdef = res.data.groupdef;
      }
    } catch (error) {
      console.log(error);
    }
  }

  getNestingGroup(group: string) {
    this.searchText = group;
    this.getGroupDef();
  }

}
