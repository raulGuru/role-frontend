import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { ItUserService } from '../it-user.service';

@Component({
  selector: 'app-change-uid',
  templateUrl: './change-uid.component.html',
  styleUrls: ['./change-uid.component.scss'],
})
export class ChangeUidComponent implements OnInit {
  chgaltForm: FormGroup;

  constructor(
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.chgaltForm = new FormGroup({
      opuid: new FormControl('', Validators.required),
      alternateuid: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onRemove() {
    if (this.chgaltForm.valid) {
      this.performAction('del');
    }
  }

  onAddClk() {
    if (this.chgaltForm.valid) {
      this.performAction('add');
    }
  }

  async performAction(operation: string) {
    const { opuid, alternateuid } = this.chgaltForm.value;
    const params = {
      opuid,
      alternateuid,
      operation,
    };
    try {
      this.toastr.clear();
      this.toastr.info('Performing action...', 'Enterprise ID', {
        disableTimeOut: true,
      });
      let altuidRes = await this.itUserService.altuid(params);
      if (altuidRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message } = altuidRes.header.altuid;
      if (status === '0') {
        Swal.fire({
          icon: 'success',
          title: 'Action performed successfully',
        });
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

  get c() {
    return this.chgaltForm.controls;
  }
}
