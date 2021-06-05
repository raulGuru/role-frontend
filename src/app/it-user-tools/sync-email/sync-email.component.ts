import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { ItUserService } from '../it-user.service';

@Component({
  selector: 'app-sync-email',
  templateUrl: './sync-email.component.html',
  styleUrls: ['./sync-email.component.scss'],
})
export class SyncEmailComponent implements OnInit {
  syncForm: FormGroup;
  users: [];

  constructor(
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.syncForm = new FormGroup({
      opuid: new FormControl(null, Validators.required),
      mailfromdomain: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  uidValid(status): void {
    if(!status) {
      this.syncForm.patchValue({ opuid: '' });
    }
  }

  onUidClosed(uid): void {
    this.syncForm.patchValue({ opuid: uid });
  }

  onUidCleard(isCleard) { 
    this.syncForm.patchValue({ opuid: '' });
  }

  async onSubmit() {
    if (this.syncForm.valid) {
      const { opuid } = this.syncForm.value;
      try {
        this.toastr.clear();
        this.toastr.info('Performing action...', 'On Synch Email', {
          disableTimeOut: true,
        });
        let actionRes = await this.itUserService.syncmail({ opuid });
        if (actionRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, info } = actionRes.header.syncmail;
        if (status === '0') {
          Swal.fire({
            icon: 'success',
            title: 'Action performed successfully',
          });
          const { mailfromdomain } = actionRes.data.syncmail;
          this.syncForm.patchValue({ mailfromdomain });
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
}
