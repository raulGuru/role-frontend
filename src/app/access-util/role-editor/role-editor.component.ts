import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { AccessService } from '../access.service';
import { LayoutService } from 'src/app/layout/layout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-editor',
  templateUrl: './role-editor.component.html',
  styleUrls: ['./role-editor.component.scss'],
})
export class RoleEditorComponent implements OnInit {
  loadContent: boolean = false;
  opuid: string | null = '';
  allRoles: any = [];
  userRoles: any = [];
  userResMsg: string = '';
  searchAllRoles: string = '';
  modifyResMsg: string = '';
  userResType: string = '';
  modifyResType: string = '';
  addBtnDisabled: boolean = true;
  delBtnDisabled: boolean = true;
  showUserResMsg: boolean = false;
  showModifyResMsg: boolean = false;
  loading: boolean = false;

  constructor(
    private accessService: AccessService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  onSearchClosed(opuid: any): void {
    if (opuid !== null) {
      this.loadRoleData(opuid);
    }
  }

  onSearchCleard(isCleard) {
    this.opuid = null;
    this.clearDefaults();
  }

  async loadRoleData(opuid: any) {
    try {
      this.opuid = opuid;
      this.clearDefaults();
      this.toastr.info('Loading...', 'Role Data', {
        disableTimeOut: true,
      });
      this.loading = true;
      let userRes = await this.accessService.getUserRoles(opuid);
      if (userRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.showUserResMsg = true;
      const { status, message } = userRes.header.userroles;
      if (status === '0') {
        const userRoles = userRes.data.userroles;
        const allRoles2 = this.layoutService.getLocalStorage('allRoles') || [];
        if (allRoles2.length === 0) {
          let allRes = await this.accessService.getAllRoles();
          if (allRes.header.status == '1') {
            this.layoutService.handleResponseError();
          }
          const { status, message } = allRes.header.allroles;
          if (status === '0') {
            this.userResType = 'alert-success';
            this.userResMsg = `Below are the results for Enterprise ID: <b>${this.opuid}</b>`;
            const allRoles = allRes.data.allroles;

            // remove common roles from allroles

            // this.allRoles = allRoles.filter(function (el) {
            //   return !userRoles.includes(el);
            // });
            const filteredRoles = allRoles.filter(function (el) {
              return !userRoles.includes(el);
            });
            filteredRoles.forEach((el) => {
              let tmp = {};
              tmp['name'] = el;
              tmp['selected'] = false;
              this.allRoles.push(tmp);
            });

            // readonly roles not in allroles
            userRoles.forEach((el) => {
              let tmp = [];
              tmp['name'] = el;
              tmp['selected'] = false;
              tmp['disabled'] = allRoles.includes(el) ? false : true;
              this.userRoles.push(tmp);
            });
            this.layoutService.setLocalStorage('allRoles', this.allRoles);
            this.loadContent = true;
            this.loading = false;
          } else {
            //if (status === '1') {
            this.userResType = 'alert-danger';
            this.userResMsg = message;
            //}
          }
        } else {
          this.allRoles = allRoles2;
          this.userResType = 'alert-success';
          this.userResMsg = `Below are the results for Enterprise ID: <b>${this.opuid}</b>`;

          // readonly roles not in allroles
          userRoles.forEach((el) => {
            let tmp = [];
            tmp['name'] = el;
            tmp['selected'] = false;
            tmp['disabled'] = allRoles2.includes(el) ? false : true;
            this.userRoles.push(tmp);
          });
          this.loadContent = true;
          this.loading = false;
        }
        this.toastr.clear();
      } else {
        this.toastr.clear();
        this.loading = false;
        this.userResType = 'alert-danger';
        this.userResMsg = message;
        // if (status === '1') {
        //   this.userResType = 'alert-danger';
        //   this.userResMsg = message;
        // }
      }
    } catch (error) { }
  }

  async moveSelected(op: string) {
    this.toastr.clear();
    this.showModifyResMsg = false;
    let role = [];
    if (op === 'del') {
      this.userRoles.forEach((item) => {
        if (item.selected) {
          role = item.name;
        }
      });
    } else {
      this.allRoles.forEach((item) => {
        if (item.selected) {
          role = item.name;
        }
      });
    }
    if (role.length === 0 || this.opuid === null || this.opuid === '') {
      Swal.fire({
        icon: 'warning',
        title: role.length === 0 ? 'No role selected!' : 'Empty Enterprise ID!',
      });
      this.userRoles.forEach((item) => {
        item.selected = false;
      });
      this.allRoles.forEach((item) => {
        item.selected = false;
      });
      return;
    }
    this.toastr.info('Performing...', 'Role Action', {
      disableTimeOut: true,
    });
    const postData = {
      opuid: this.opuid,
      op,
      role,
    };
    try {
      let res = await this.accessService.modifyRole(postData);
      if (res.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      this.showModifyResMsg = true;
      const { status, message } = res.header.action;
      if (status === '0') {
        this.modifyResType = 'alert-success';
        this.modifyResMsg = 'Operation performed successfully!';
        // perform move
        if (op === 'del') {
          this.userRoles.forEach((item) => {
            if (item.selected) {
              role = item.name;
              this.allRoles.push(item);
            }
          });
          this.userRoles = this.userRoles.filter((i) => !i.selected);
          this.addBtnDisabled = false;
          this.delBtnDisabled = true;
        } else {
          this.allRoles.forEach((item) => {
            if (item.selected) {
              role = item.name;
              this.userRoles.push(item);
            }
          });
          this.allRoles = this.allRoles.filter((i) => !i.selected);
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

  toggleSelection(item, action: string) {
    if (item.disabled) return;
    this.userRoles.forEach((el) => {
      el.selected = false;
    });
    this.allRoles.forEach((el) => {
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

  clearDefaults() {
    this.toastr.clear();
    this.allRoles = [];
    this.userRoles = [];
    this.addBtnDisabled = this.delBtnDisabled = true;
    this.loadContent = false;
    this.showUserResMsg = false;
    this.userResMsg = '';
    this.userResType = '';
    this.searchAllRoles = '';
  }
}
