import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  phonecodes: [];
  royaltyCodes = [
    { id: '', name: 'None' },
    { id: 'BR', name: 'Bongo' },
    { id: 'C1', name: 'Cannon' },
    { id: 'C2', name: 'Cannon Classic' },
    { id: 'C5', name: 'Cannon Coexist' },
    { id: 'C3', name: 'Cannon Kids' },
    { id: 'C4', name: 'Cannon Royal Family' },
    { id: 'MM', name: 'Disney Non-Royalty' },
    { id: 'M', name: 'Disney Royalty' },
    { id: 'ES', name: 'Everlast Sport' },
    { id: 'JS', name: 'Jaclyn Smith' },
    { id: 'JB', name: 'Joe Boxer' },
    { id: 'MS', name: 'Martha Stewart' },
    { id: 'PC', name: 'Protege Products Corporation' },
    { id: 'W', name: 'Route 66' },
    { id: 'SL', name: 'Sandra by Sandra Lee' },
  ];

  constructor(
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.vendorForm = new FormGroup({
      givenname: new FormControl('', Validators.required),
      sn: new FormControl('', Validators.required),
      uid: new FormControl('', Validators.required),
      o: new FormControl(null, Validators.required),
      mail: new FormControl('', Validators.required),
      kl: new FormControl(),
      sbp: new FormControl(),
      wb: new FormControl(),
      ems: new FormControl(),
      ap0: new FormControl(),
      ap: new FormControl(),
      cc: new FormControl(),
      lb: new FormControl(),
      mk: new FormControl(),
      pmu: new FormControl(),
      rc: new FormControl(),
      ark: new FormControl(),
      ima: new FormControl(),
      rep: new FormControl(),
      ins: new FormControl(),
      pri: new FormControl(),
      adm: new FormControl(),
      cn: new FormControl(),
      ip: new FormControl(),
      plm: new FormControl(),
      iin: new FormControl(),
      trp: new FormControl(),
      srp: new FormControl(),
      osnd: new FormControl(),
      vxnet: new FormControl(),
      macdb: new FormControl(),
      countrycode: new FormControl(null),
      telephonenumber: new FormControl(),
      ext: new FormControl(),
      roycode: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.itUserService.getPhoneCodes().then(
      (response) => {
        this.phonecodes = response;
      },
      (error) => {
        window.alert(error);
      }
    );
    this.opuid = this.route.snapshot.paramMap.get('id');
    if (this.opuid) {
      this.getVendor(this.opuid);
    }
  }

  async getVendor(opuid: string) {
    try {
      this.toastr.clear();
      this.toastr.info('Searching...', 'Searching Enterprise ID', {
        disableTimeOut: true,
      });
      let vendorRes = await this.itUserService.getvendor({
        opuid,
      });
      if (vendorRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, info } = vendorRes.header.getvendor;
      if (status === '0') {
        this.patchVendorValues(vendorRes.data.getvendor);
        this.patchChkBxs(vendorRes.data.getvendor);
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

  patchVendorValues(data: any) {
    Object.keys(data).forEach((key) => {
      this.vendorForm.patchValue({
        [key]: data[key],
      });
    });
  }

  patchChkBxs(data: any) {
    if (data.ins) {
      this.handleInstaller(true);
    }
  }

  async onAccountSubmit() {
    if (this.vendorForm.valid) {
      let params = {};
      const formVals = this.vendorForm.value;
      for (const key in formVals) {
        const element = formVals[key];
        params[key] = element === null ? false : element;
      }
      params['operation'] = this.opuid ? 'modify' : 'add';
      try {
        this.toastr.clear();
        this.toastr.info('Performing action...', 'On Vendor', {
          disableTimeOut: true,
        });
        let actionRes = await this.itUserService.addModifyVendor(params);
        if (actionRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, info } = actionRes.header.vendor;
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

  async onRemoveClk() {
    try {
      this.toastr.clear();
      this.toastr.info('Removing...', 'On Vendor', {
        disableTimeOut: true,
      });
      let actionRes = await this.itUserService.deleteVendor({
        opuid: this.opuid,
      });
      if (actionRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, info } = actionRes.header.delete;
      if (status === '0') {
        Swal.fire({
          icon: 'success',
          title: 'Action performed successfully',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/ituser/lookup']);
          }
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

  async onResetClk() {
    try {
      this.toastr.clear();
      this.toastr.info('Resetting password...', 'On Vendor', {
        disableTimeOut: true,
      });
      let actionRes = await this.itUserService.resetpwVendor({
        opuid: this.opuid,
      });
      if (actionRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, info } = actionRes.header.resetpw;
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

  handleWorkbench(e) {
    if (e.target.id === 'wb') {
      this.vendorForm.patchValue({
        ap: false,
        cc: false,
        sbp: false,
        ems: false,
        lb: false,
      });
    } else {
      this.vendorForm.patchValue({
        wb: false,
      });
    }
  }

  handleInstaller(chk: boolean) {
    if (chk)
      this.vendorForm.patchValue({
        ap0: true,
      });
  }

  get c() {
    return this.vendorForm.controls;
  }
}
