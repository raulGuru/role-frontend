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
  lookupUid: string;
  uidReadOnly: boolean;
  givennameStr: string = null;
  snStr: string = null;
  chkbxs: any = [];

  constructor(
    private route: ActivatedRoute,
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.chkbxs = [
      { label: 'K1', value: 'k1', disabled: false, checked: false },
      { label: 'E1', value: 'e1', disabled: false, checked: false },
      { label: 'E3', value: 'e3', disabled: false, checked: false },
      { label: 'E5', value: 'e5', disabled: false, checked: false },
    ];

    this.reserveForm = new FormGroup({
      uid: new FormControl('', Validators.required),
      emplid: new FormControl('', Validators.required),
      givenname: new FormControl('', Validators.required),
      sn: new FormControl('', Validators.required),
      sears2: new FormControl(),
      kmart: new FormControl(),
    });
    this.uidReadOnly = false;
  }

  async ngOnInit(): Promise<void> {
    this.lookupUid = this.route.snapshot.paramMap.get('id');
    if (this.lookupUid) {
      try {
        this.toastr.clear();
        this.toastr.info('Searching...', 'Enterprise ID Search', {
          disableTimeOut: true,
        });
        let resuserRes = await this.itUserService.getresuser(this.lookupUid);
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
            sears2,
          });
          if (k1 === false && e1 === false && e3 === false && e5 === false) {
          } else {
            this.chkBxPatch(resuserRes.data.getresuser);
          }
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

  chkBxPatch(items) {
    for (let [key, value] of Object.entries(items)) {
      this.chkbxs.forEach((el) => {
        if (el.value === key) {
          el.disabled = !value;
          el.checked = value;
        }
      });
    }
  }

  async generateUid() {
    if (this.lookupUid) return true;
    const { givenname, sn } = this.reserveForm.value;
    if (givenname && sn && !this.lookupUid) {
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

  async onReserveSubmit() {
    const {
      uid,
      givenname,
      sn,
      emplid,
      kmart,
      sears2,
    } = this.reserveForm.value;
    const params = {
      operation: this.lookupUid ? 'modify' : 'add',
      uid,
      emplid,
      givenname,
      sn,
      kmart: kmart || false,
      sears2: sears2 || false,
      k1: this.chkbxs[0].checked,
      e1: this.chkbxs[1].checked,
      e3: this.chkbxs[2].checked,
      e5: this.chkbxs[3].checked,
    };
    try {
      this.toastr.clear();
      this.toastr.info('Performing action...', 'Lookup Reserved', {
        disableTimeOut: true,
      });
      let resSubRes = await this.itUserService.reserveuser(params);
      if (resSubRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message } = resSubRes.header.reserveuser;
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
      window.alert(error);
    }
  }

  get c() {
    return this.reserveForm.controls;
  }

  disableOther(chk) {
    this.chkbxs.forEach((x) => {
      if (x.value !== chk.value) {
        x.disabled = !x.disabled;
      }
      if (x.value === chk.value) {
        x.checked = !x.checked;
      }
    });
  }
}
