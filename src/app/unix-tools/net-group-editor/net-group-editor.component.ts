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
  loadForm: FormGroup;
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
  ) {
    this.loadForm = new FormGroup({
      opuid: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  async loadGroupData() {
    if (this.loadForm.valid) {
      try {
        this.opuid = this.loadForm.value.opuid;
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
          let allRes = await this.unixService.getAllNetGroups('user');
          if (allRes.header.status == '1') {
            this.layoutService.handleResponseError();
          }
          this.toastr.clear();
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
              let tmp = [];
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
            this.loadContent = true;
            this.loading = false;
          } else {
            if (status === '1') {
              this.userResType = 'alert-danger';
              this.userResMsg = `${message}</br>${info || ''}`;
            }
          }
        } else {
          this.toastr.clear();
          this.loading = false;
          if (status === '1') {
            this.userResType = 'alert-danger';
            this.userResMsg = `${message}</br>${info || ''}`;
          }
        }
      } catch (error) {}
    } else {
      //window.alert('Please enter Enterprise ID!')
      Swal.fire('Please enter Enterprise ID!');
    }
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
    } catch (error) {}
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

  get c() {
    return this.loadForm.controls;
  }
}
