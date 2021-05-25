import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { UnixService } from '../unix.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  groupForm: FormGroup;

  constructor(
    private unixService: UnixService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) { 
    this.groupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      gidnumber: new FormControl(''),
      desc: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (this.groupForm.valid) {
      const { name, gidnumber, desc } = this.groupForm.value;
      try {
        this.toastr.clear();
        this.toastr.info('Adding Group...', 'Unix Group', {
          disableTimeOut: true,
        });
        let submitRes = await this.unixService.addunixgroup({
          name,
          gidnumber,
          desc,
        });
        if (submitRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, info } = submitRes.header.addunixgroup;
        if (status === '0') {
          Swal.fire({
            icon: 'success',
            title: 'Action performed successfully',
          }).then((result) => {
            this.groupForm.reset();
          });
          // const { gidnumber } = submitRes.data.addunixgroup;
          // this.groupForm.patchValue({ gidnumber });
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
    return this.groupForm.controls;
  }

}
