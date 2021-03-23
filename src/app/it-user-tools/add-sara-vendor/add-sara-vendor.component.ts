import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { ItUserService } from '../it-user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-sara-vendor',
  templateUrl: './add-sara-vendor.component.html',
  styleUrls: ['./add-sara-vendor.component.scss']
})
export class AddSaraVendorComponent implements OnInit {
  saraVendorForm: FormGroup;
  uidReadOnly: boolean;
  orgs = [];
  opuid: string;
  phonecodes: [];

  constructor(
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.saraVendorForm = new FormGroup({
      givenname: new FormControl('', Validators.required),
      sn: new FormControl('', Validators.required),
      uid: new FormControl('', Validators.required),
      o: new FormControl(null, Validators.required),
      mail: new FormControl('', Validators.required),
      sig: new FormControl(),
      admin: new FormControl(),
      countrycode: new FormControl(null),
      telephonenumber: new FormControl(''),
      ext: new FormControl(''),
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
      this.getSaraVendor(this.opuid);
    }
  }

  async getSaraVendor(opuid: string) {
    try {
      this.toastr.clear();
      this.toastr.info('Searching...', 'Searching Enterprise ID', {
        disableTimeOut: true,
      });
      let saraVendorRes = await this.itUserService.getsaravendor({
        opuid,
      });
      if (saraVendorRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, info } = saraVendorRes.header.getsaravendor;
      if (status === '0') {
        this.patchSaraVendorValues(saraVendorRes.data.getsaravendor);
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

  patchSaraVendorValues(data: any) {
    Object.keys(data).forEach((key) => {
      this.saraVendorForm.patchValue({
        [key]: data[key],
      });
    });
  }

  async onAccountSubmit() {
    if (this.saraVendorForm.valid) {
      let params = {};
      const formVals = this.saraVendorForm.value;
      for (const key in formVals) {
        const element = formVals[key];
        if(key === 'countrycode') {
          params[key] = element || '';
        } else {
          params[key] = element === null ? false : element;
        }
      }
      params['operation'] = this.opuid ? 'modify' : 'add';
      try {
        this.toastr.clear();
        this.toastr.info('Performing action...', 'On Sara Vendor', {
          disableTimeOut: true,
        });
        let actionRes = await this.itUserService.addModifySaraVendor(params);
        if (actionRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, info } = actionRes.header.saravendor;
        if (status === '0') {
          Swal.fire({
            icon: 'success',
            title: 'Action performed successfully',
          });
        } else {
          Swal.fire({
            width: 1000,
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
      this.toastr.info('Removing...', 'On Sara Vendor', {
        disableTimeOut: true,
      });
      let actionRes = await this.itUserService.deleteSaraVendor({
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
      this.toastr.info('Resetting password...', 'On Sara Vendor', {
        disableTimeOut: true,
      });
      let actionRes = await this.itUserService.resetpwSaraVendor({
        opuid: this.opuid,
      });
      if (actionRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, info } = actionRes.header.resetpw;
      if (status === '0') {
        Swal.fire({
          width: 1000,
          icon: 'success',
          title: `Action performed successfully</br>${info || ''}`,
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
    const { givenname, sn } = this.saraVendorForm.value;
    if (givenname && sn && !this.opuid) {
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
          this.saraVendorForm.patchValue({ uid });
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
    return this.saraVendorForm.controls;
  }

}
