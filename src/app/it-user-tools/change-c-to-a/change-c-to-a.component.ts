import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { ItUserService } from '../it-user.service';

@Component({
  selector: 'app-change-c-to-a',
  templateUrl: './change-c-to-a.component.html',
  styleUrls: ['./change-c-to-a.component.scss'],
})
export class ChangeCToAComponent implements OnInit {
  chgc2aForm: FormGroup;

  constructor(
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.chgc2aForm = new FormGroup({
      opuid: new FormControl('', Validators.required),
      ssn: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  async onChngSub() {
    if (this.chgc2aForm.valid) {
      const { opuid, ssn } = this.chgc2aForm.value;
      const params = {
        opuid,
        ssn,
        operation: 'modify',
      };
      try {
        this.toastr.clear();
        this.toastr.info('Performing action...', 'Contractor ID', {
          disableTimeOut: true,
        });
        let chgc2aRes = await this.itUserService.changessn(params);
        if (chgc2aRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, info } = chgc2aRes.header.changessn;
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
        window.alert(error);
      }
    }
  }

  get c() {
    return this.chgc2aForm.controls;
  }
}
