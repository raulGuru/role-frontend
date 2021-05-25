import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { ItUserService } from '../it-user.service';

@Component({
  selector: 'app-rename-contractor',
  templateUrl: './rename-contractor.component.html',
  styleUrls: ['./rename-contractor.component.scss'],
})
export class RenameContractorComponent implements OnInit {
  renameForm: FormGroup;
  users: [];

  constructor(
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.renameForm = new FormGroup({
      ouid: new FormControl(null, Validators.required),
      nuid: new FormControl('', Validators.required),
      delnuid: new FormControl(false),
    });
  }

  ngOnInit(): void {}

  async getUserList(event: any) {
    if (event.term.length < 3) return;
    const post = { opuid: event.term };
    try {
      this.toastr.clear();
      this.toastr.info('Searching...', 'User List', {
        disableTimeOut: true,
      });
      let usersRes = await this.itUserService.searchuid(post);
      if (usersRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, info } = usersRes.header.searchuid;
      if (status === '0') {
        this.users = usersRes.data.searchuid;
      } else {
        Swal.fire({
          icon: 'error',
          title: `${message}</br>${info || ''}`,
        });
      }
    } catch (error) {
      this.toastr.clear();
      console.log(error);
    }
  }

  async onRenameSub() {
    if (this.renameForm.valid) {
      const { ouid, nuid, delnuid } = this.renameForm.value;
      const params = {
        ouid,
        nuid,
        delnuid,
      };
      try {
        this.toastr.clear();
        this.toastr.info('Performing action...', 'Renaming', {
          disableTimeOut: true,
        });
        let renameRes = await this.itUserService.renameid(params);
        if (renameRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, info } = renameRes.header.renameid;
        if (status === '0') {
          Swal.fire({
            icon: 'success',
            title: 'Action performed successfully',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: `${message}</br>${info || ''}`,
          });
        }
      } catch (error) {
        this.toastr.clear();
        console.log(error);
      }
    }
  }

  get c() {
    return this.renameForm.controls;
  }
}
