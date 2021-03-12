import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { ItUserService } from '../it-user.service';

@Component({
  selector: 'app-change-ssn',
  templateUrl: './change-ssn.component.html',
  styleUrls: ['./change-ssn.component.scss'],
})
export class ChangeSsnComponent implements OnInit {
  chgssnForm: FormGroup;

  constructor(
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.chgssnForm = new FormGroup({
      opuid: new FormControl('', Validators.required),
      ssn: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
        Validators.pattern('[0-9]+'),
      ]),
    });
  }

  ngOnInit(): void {}

  async onChngSub() {
    if (this.chgssnForm.valid) {
      const { opuid, ssn } = this.chgssnForm.value;
      const params = {
        opuid,
        ssn,
        operation: 'modify',
      };
      try {
        this.toastr.clear();
        this.toastr.info('Performing action...', 'Enterprise ID', {
          disableTimeOut: true,
        });
        let chgssnRes = await this.itUserService.changessn(params);
        if (chgssnRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, info } = chgssnRes.header.changessn;
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
    return this.chgssnForm.controls;
  }
}
