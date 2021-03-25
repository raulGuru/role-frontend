import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { UnixService } from '../unix.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss'],
})
export class AddProfileComponent implements OnInit {
  profileForm: FormGroup;
  users: [];

  constructor(
    private unixService: UnixService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.profileForm = new FormGroup({
      opuid: new FormControl(null, Validators.required),
      uidnumber: new FormControl(''),
      homedir: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.profileForm.valid) {
      const { opuid, uidnumber, homedir } = this.profileForm.value;
      try {
        this.toastr.clear();
        this.toastr.info('Adding profile...', 'Unix Profile', {
          disableTimeOut: true,
        });
        let submitRes = await this.unixService.unixprofile({
          opuid,
          uidnumber,
          homedir,
        });
        if (submitRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, info } = submitRes.header.unixprofile;
        if (status === '0') {
          Swal.fire({
            icon: 'success',
            title: 'Action performed successfully',
          });
          const { uidnumber } = submitRes.data.unixprofile;
          this.profileForm.patchValue({ uidnumber });
        } else {
          Swal.fire({
            icon: 'error',
            title: `${message}</br>${info || ''}`,
          });
        }
      } catch (error) {
        this.toastr.clear();
        window.alert(error);
      }
    }
  }

  async getUserIds(event: any) {
    if (event.term.length < 3) return;
    const post = { opuid: event.term };
    try {
      this.toastr.clear();
      this.toastr.info('Searching...', 'User List', {
        disableTimeOut: true,
      });
      let usersRes = await this.layoutService.searchuid(post);
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
      window.alert(error);
    }
  }

  get c() {
    return this.profileForm.controls;
  }
}
