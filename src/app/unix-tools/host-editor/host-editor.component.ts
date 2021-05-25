import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { LayoutService } from 'src/app/layout/layout.service';
import Swal from 'sweetalert2';
import { UnixService } from '../unix.service';

@Component({
  selector: 'app-host-editor',
  templateUrl: './host-editor.component.html',
  styleUrls: ['./host-editor.component.scss'],
})
export class HostEditorComponent implements OnInit {
  hostForm: FormGroup;
  groups: [];

  constructor(
    private unixService: UnixService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.hostForm = new FormGroup({
      unixnetgroup: new FormControl(null, Validators.required),
      op: new FormControl('add', Validators.required),
      host: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getNetGroups();
  }

  async onSubmit() {
    if (this.hostForm.valid) {
      console.log(this.hostForm.value);
      const { host, op, unixnetgroup } = this.hostForm.value;
      try {
        this.toastr.clear();
        this.toastr.info('Performing action...', 'Unix Host Net Group', {
          disableTimeOut: true,
        });
        let submitRes = await this.unixService.modifyHostNetGrp({
          host,
          op,
          unixnetgroup,
        });
        if (submitRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, info } = submitRes.header.action;
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
        console.log(error);
      }
    }
  }

  async getNetGroups() {
    try {
      this.toastr.clear();
      this.toastr.info('Fetching...', 'On Host Net Group', {
        disableTimeOut: true,
      });
      let grpsRes = await this.unixService.getAllNetGroups('host');
      if (grpsRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, info } = grpsRes.header.allunixnetgroups;
      if (status === '0') {
        const g = grpsRes.data.allunixnetgroups;
        this.groups = g.map((el: string) => {
          return {
            id: el,
            name: el,
          };
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

  clearForm() {
    this.hostForm.reset();
    this.hostForm.patchValue({ op: 'add' });
  }

  get c() {
    return this.hostForm.controls;
  }
}
