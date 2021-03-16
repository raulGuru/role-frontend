import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { ItUserService } from '../it-user.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss'],
})
export class AddVendorComponent implements OnInit {
  vendorForm: FormGroup;
  uidReadOnly: boolean;
  orgs = [];
  opuid: string;

  constructor(
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.vendorForm = new FormGroup({
      givenname: new FormControl('', Validators.required),
      sn: new FormControl('', Validators.required),
      uid: new FormControl('', Validators.required),
      o: new FormControl(null, Validators.required),
      kl: new FormControl(),
      sbp: new FormControl(),
      fullw: new FormControl(),
      dt: new FormControl(),
      ap: new FormControl(),
      ap0: new FormControl(),
      cc: new FormControl(),
      lbusiness: new FormControl(),
      mk: new FormControl(),
      pri: new FormControl(),
      rc: new FormControl(),
      ark: new FormControl(),
      ima: new FormControl(),
      rep: new FormControl(),
      ins: new FormControl(),
      pcont: new FormControl(),
      adm: new FormControl(),
      cn: new FormControl(),
      importv: new FormControl(),
      plm: new FormControl(),
      iin: new FormControl(),
      trp: new FormControl(),
      alex: new FormControl(),
      osnd: new FormControl(),
      vxnet: new FormControl(),
      macdb: new FormControl(),
    });
  }

  ngOnInit(): void {}

  async getOrgs(event: any) {
    if (event.term.length < 3) return;
    const post = { org: event.term };
    try {
      this.toastr.clear();
      this.toastr.info('Searching...', 'Fetching Organizations', {
        disableTimeOut: true,
      });
      let orgsRes = await this.itUserService.getorgs(post);
      if (orgsRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, info } = orgsRes.header.getorgs;
      if (status === '0') {
        this.orgs = orgsRes.data.getorgs;
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

  async generateUid() {
    const { givenname, sn } = this.vendorForm.value;
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
        const { status, message, info } = generateRes.header.generateuid;
        if (status === '0') {
          const { uid } = generateRes.data.generateuid;
          this.vendorForm.patchValue({ uid });
          this.uidReadOnly = true;
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
    return this.vendorForm.controls;
  }
}
