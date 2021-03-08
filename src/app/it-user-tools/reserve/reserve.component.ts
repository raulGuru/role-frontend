import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { ItUserService } from '../it-user.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss'],
})
export class ReserveComponent implements OnInit {
  reserveForm: FormGroup;
  uid: string;
  uidReadOnly: boolean;
  givennameStr: string = null;
  snStr: string = null;

  constructor(
    private route: ActivatedRoute,
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.reserveForm = new FormGroup({
      uid: new FormControl('', Validators.required),
      emplid: new FormControl('', Validators.required),
      givenname: new FormControl('', Validators.required),
      sn: new FormControl('', Validators.required),
      sears2: new FormControl(),
      kmart: new FormControl(),
      k1: new FormControl(),
      e1: new FormControl(),
      e3: new FormControl(),
      e5: new FormControl(),
    });
    this.uidReadOnly = false;
  }

  async ngOnInit(): Promise<void> {
    this.uid = this.route.snapshot.paramMap.get('id');
    if (this.uid) {
      try {
        this.toastr.clear();
        this.toastr.info('Searching...', 'Enterprise ID Search', {
          disableTimeOut: true,
        });
        let resuserRes = await this.itUserService.getresuser(this.uid);
        if (resuserRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message } = resuserRes.header.getresuser;
        if (status === '0') {
          const {
            uid,
            givenname,
            sn,
            emplid,
            sears2,
            kmart,
            k1,
            e1,
            e3,
            e5,
          } = resuserRes.data.getresuser;
          this.reserveForm.patchValue({
            uid,
            emplid,
            givenname,
            sn,
            kmart,
          });
          this.uidReadOnly = true;
        } else {
          Swal.fire({
            icon: 'error',
            title: message,
          });
        }
      } catch (error) {
        this.toastr.clear();
        window.alert(error);
      }
    }
  }

  async generateUid() {
    const { givenname, sn } = this.reserveForm.value;
    if (givenname && sn) {
      try {
        this.toastr.clear();
        this.toastr.info('Generating...', 'Generating Enterprise ID', {
          disableTimeOut: true,
        });
        let generateRes = await this.itUserService.generateuid(givenname, sn);
        if (generateRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message } = generateRes.header.generateuid;
        if (status === '0') {
          const { uid } = generateRes.data.generateuid;
          this.reserveForm.patchValue({ uid });
          this.uidReadOnly = true;
        } else {
          Swal.fire({
            icon: 'error',
            title: message,
          });
        }
      } catch (error) {
        this.toastr.clear();
        window.alert(error);
      }
    }
  }

  onReserveSubmit() {
    console.log(this.reserveForm.value)
  }

  get c() {
    return this.reserveForm.controls;
  }

  clearForm() {
    this.reserveForm.reset();
  }
}
