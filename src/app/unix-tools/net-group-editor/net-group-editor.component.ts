import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/layout.service';
import Swal from 'sweetalert2';
import { UnixService } from '../unix.service';

@Component({
  selector: 'app-net-group-editor',
  templateUrl: './net-group-editor.component.html',
  styleUrls: ['./net-group-editor.component.scss'],
})
export class NetGroupEditorComponent implements OnInit {
  opuid: string = '';
  loading: boolean = false;
  loadContent: boolean = false;
  showUserResMsg: boolean = false;
  userResType: string = '';
  userResMsg: string = '';
  searchAllGroups: string = '';
  allGroups: any = [];
  userGroups: any = [];
  addBtnDisabled: boolean = true;
  delBtnDisabled: boolean = true;
  showModifyResMsg: boolean = false;
  modifyResType: string = '';
  modifyResMsg: string = '';

  constructor(
    private unixService: UnixService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  onSearchClosed(opuid: any): void {
    if (opuid !== null) {
      this.opuid = opuid;
      this.loadGroupData();
    }
  }

  onSearchCleard(isCleard): void {
    this.opuid = null;
    this.clearDefaults();
  }

  async loadGroupData() {
    try {
      this.clearDefaults();
      this.toastr.info('Loading...', 'Net Group Data', {
        disableTimeOut: true,
      });
      this.loading = true;
      let userRes = await this.unixService.getUserNetGroups(this.opuid);
      if (userRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.showUserResMsg = true;
      const { status, message, info } = userRes.header.userunixnetgroups;
      if (status === '0') {
        const userGroups = userRes.data.userunixnetgroups;
        const allGroups2 = this.layoutService.getLocalStorage('allUnixNetGroups') || [];
        if (allGroups2.length === 0) {
          let allRes = await this.unixService.getAllNetGroups('user');
          if (allRes.header.status == '1') {
            this.layoutService.handleResponseError();
          }
          const { status, message, info } = allRes.header.allunixnetgroups;
          if (status === '0') {
            this.userResType = 'alert-success';
            this.userResMsg = `Below are the results for Enterprise ID: <b>${this.opuid}</b>`;
            const allGroups = allRes.data.allunixnetgroups;

            // remove common groups from allunixnetgroups

            // this.allGroups = allGroups.filter(function (el) {
            //   return !userGroups.includes(el);
            // });
            const filteredGroups = allGroups.filter(function (el) {
              return !userGroups.includes(el);
            });
            filteredGroups.forEach((el) => {
              let tmp = {};
              tmp['name'] = el;
              tmp['selected'] = false;
              this.allGroups.push(tmp);
            });

            // readonly groups not in allunixnetgroups
            userGroups.forEach((el) => {
              let tmp = [];
              tmp['name'] = el;
              tmp['selected'] = false;
              tmp['disabled'] = allGroups.includes(el) ? false : true;
              this.userGroups.push(tmp);
            });
            this.layoutService.setLocalStorage('allUnixNetGroups', this.allGroups);
            this.loadContent = true;
            this.loading = false;
          } else {
            if (status === '1') {
              this.userResType = 'alert-danger';
              this.userResMsg = `${message}</br>${info || ''}`;
            }
          }
        } else {
          this.allGroups = allGroups2;
          this.userResType = 'alert-success';
          this.userResMsg = `Below are the results for Enterprise ID: <b>${this.opuid}</b>`;

          // readonly groups not in allunixnetgroups
          userGroups.forEach((el) => {
            let tmp = [];
            tmp['name'] = el;
            tmp['selected'] = false;
            tmp['disabled'] = allGroups2.includes(el) ? false : true;
            this.userGroups.push(tmp);
          });
          this.loadContent = true;
          this.loading = false;
        }
        this.toastr.clear();
      } else {
        this.toastr.clear();
        this.loading = false;
        if (status === '1') {
          this.userResType = 'alert-danger';
          this.userResMsg = `${message}</br>${info || ''}`;
        }
      }
    } catch (error) { }
  }

  toggleSelection(item, action: string) {
    if (item.disabled) return;
    this.userGroups.forEach((el) => {
      el.selected = false;
    });
    this.allGroups.forEach((el) => {
      el.selected = false;
    });
    if (action === 'a') {
      this.addBtnDisabled = false;
      this.delBtnDisabled = true;
    } else {
      this.addBtnDisabled = true;
      this.delBtnDisabled = false;
    }
    item.selected = !item.selected;
  }

  async moveSelected(op: string) {
    this.toastr.clear();
    this.showModifyResMsg = false;
    let unixnetgroup = '';
    if (op === 'del') {
      this.userGroups.forEach((item) => {
        if (item.selected) {
          unixnetgroup = item.name;
        }
      });
    } else {
      this.allGroups.forEach((item) => {
        if (item.selected) {
          unixnetgroup = item.name;
        }
      });
    }
    if (!unixnetgroup || !this.opuid) {
      Swal.fire({
        icon: 'warning',
        title: !unixnetgroup
          ? 'No Net group selected!'
          : 'Empty Enterprise ID!',
      });
      return;
    }
    this.toastr.info('Performing...', 'Group Action', {
      disableTimeOut: true,
    });
    const postData = {
      opuid: this.opuid,
      op,
      unixnetgroup,
    };
    try {
      let res = await this.unixService.modifyNetGroup(postData);
      if (res.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      this.showModifyResMsg = true;
      const { status, message } = res.header.action;
      if (status === '0') {
        this.modifyResType = 'alert-success';
        this.modifyResMsg = 'Operation performed successfully!';
        this.searchAllGroups = '';
        // perform move
        if (op === 'del') {
          this.userGroups.forEach((item) => {
            if (item.selected) {
              this.allGroups.push(item);
            }
          });
          this.userGroups = this.userGroups.filter((i) => !i.selected);
          this.addBtnDisabled = false;
          this.delBtnDisabled = true;
        } else {
          this.allGroups.forEach((item) => {
            if (item.selected) {
              this.userGroups.push(item);
            }
          });
          this.allGroups = this.allGroups.filter((i) => !i.selected);
          this.addBtnDisabled = true;
          this.delBtnDisabled = false;
        }
      } else {
        this.modifyResType = 'alert-danger';
        this.modifyResMsg = message;
      }
      Swal.fire({
        icon: status === '0' ? 'success' : 'error',
        title: this.modifyResMsg,
      });
    } catch (error) { }
  }

  clearDefaults() {
    this.allGroups = [];
    this.userGroups = [];
    this.addBtnDisabled = this.delBtnDisabled = true;
    this.loadContent = false;
    this.showUserResMsg = false;
    this.userResMsg = '';
    this.userResType = '';
    this.toastr.clear();
  }
}
