import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { UnixService } from '../unix.service';

@Component({
  selector: 'app-add-net-group',
  templateUrl: './add-net-group.component.html',
  styleUrls: ['./add-net-group.component.scss'],
})
export class AddNetGroupComponent implements OnInit {
  netGrpForm: FormGroup;
  types = [
    { id: 'host', name: 'Host' },
    { id: 'user', name: 'User' },
  ];

  constructor(
    private unixService: UnixService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.netGrpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('host', Validators.required),
      desc: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.netGrpForm.valid) {
      const { name, type, desc } = this.netGrpForm.value;
      try {
        this.toastr.clear();
        this.toastr.info('Adding Group...', 'Unix Net Group', {
          disableTimeOut: true,
        });
        let submitRes = await this.unixService.addunixnetgroup({
          name,
          type,
          desc,
        });
        if (submitRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, info } = submitRes.header.addunixnetgroup;
        if (status === '0') {
          Swal.fire({
            icon: 'success',
            title: 'Action performed successfully',
          }).then((result) => {
            this.clearForm();
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

  clearForm() {
    this.netGrpForm.reset();
    this.netGrpForm.patchValue({ type: 'host' });
  }

  get c() {
    return this.netGrpForm.controls;
  }
}
