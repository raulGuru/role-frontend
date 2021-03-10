import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { LayoutService } from 'src/app/layout/layout.service';
import { ItUserService } from '../it-user.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss'],
})
export class AddVendorComponent implements OnInit {
  vendorForm: FormGroup;
  businessCats: any;
  businessUnits: any;
  genericIDs = [
    { id: 'u', name: 'Unspecified' },
    { id: 'a', name: 'Appliance Hardware' },
    { id: 't', name: 'Automotive Technician' },
    { id: 'd', name: 'Dealer Store' },
    { id: 'o', name: 'Outlet Store' },
  ];
  orgs = [
    { id: '1', name: 'Test1' },
    { id: '2', name: 'Test2' },
  ];
  disable: boolean = false;

  constructor(
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.vendorForm = new FormGroup({
      givenname: new FormControl('', Validators.required),
      sn: new FormControl('', Validators.required),
      uid: new FormControl('', Validators.required),
      o: new FormControl('', Validators.required),
      shclocnumber: new FormControl('', Validators.required),
      Challenge: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      emplid: new FormControl(''),
      procid: new FormControl(''),
      Expiration: new FormControl(''),
      manager: new FormControl(''),
      Office: new FormControl(''),
      businessUnit: new FormControl(''),
      businesscategory: new FormControl(''),
      genericIDs: new FormControl(''),
      genericIdChbx: new FormControl(),
      vendorAccount: new FormControl(),
      Password: new FormControl(),
      Testing: new FormControl(),
      Procurement: new FormControl(),
      kmart: new FormControl(),
      sears2: new FormControl(),
      vpn: new FormControl(),
      k1: new FormControl(),
      e1: new FormControl(),
      e3: new FormControl(),
      e5: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.itUserService.getBusinessCategories().then(
      (response) => {
        this.businessCats = Object.entries(response);
      },
      (error) => {
        window.alert(error);
      }
    );

    this.itUserService.getBusinessUnits().then(
      (response) => {
        this.businessUnits = Object.entries(response);
      },
      (error) => {
        window.alert(error);
      }
    );
  }

  handleControl(chk: boolean, control: string) {
    switch (control) {
      case 'genericIdChbx':
        this.manageControl(chk, 'Testing');
        this.manageControl(chk, 'Procurement');
        this.manageControl(chk, 'sears2');
        break;
      case 'vendorAccount':
        this.manageControl(chk, 'Testing');
        this.manageControl(chk, 'Procurement');
        this.manageControl(chk, 'kmart');
        this.manageControl(chk, 'sears2');
        this.manageControl(chk, 'k1');
        this.manageControl(chk, 'e1');
        this.manageControl(chk, 'e3');
        this.manageControl(chk, 'e5');
        break;
      case 'Testing':
        this.manageControl(chk, 'genericIdChbx');
        this.manageControl(chk, 'vendorAccount');
        this.manageControl(chk, 'Password');
        this.manageControl(chk, 'Procurement');
        this.manageControl(chk, 'vpn');
        this.manageControl(chk, 'kmart');
        this.manageControl(chk, 'sears2');
        this.manageControl(chk, 'k1');
        this.manageControl(chk, 'e1');
        this.manageControl(chk, 'e3');
        this.manageControl(chk, 'e5');
        break;
      case 'Password':
        this.manageControl(chk, 'vendorAccount');
        this.manageControl(chk, 'Testing');
        this.manageControl(chk, 'Procurement');
        this.manageControl(chk, 'vpn');
        this.manageControl(chk, 'kmart');
        this.manageControl(chk, 'sears2');
        this.manageControl(chk, 'k1');
        this.manageControl(chk, 'e1');
        this.manageControl(chk, 'e3');
        this.manageControl(chk, 'e5');
        break;
      case 'Procurement':
        this.manageControl(chk, 'Testing');
        this.manageControl(chk, 'genericIdChbx');
        this.manageControl(chk, 'vendorAccount');
        break;
      case 'kmart':
        this.manageControl(chk, 'Testing');
        this.manageControl(chk, 'vendorAccount');
        break;
      case 'sears2':
        this.manageControl(chk, 'Testing');
        this.manageControl(chk, 'genericIdChbx');
        this.manageControl(chk, 'vendorAccount');
        break;
      case 'vpn':
        this.manageControl(chk, 'Testing');
        this.manageControl(chk, 'Password');
        break;
      case 'k1':
      case 'e1':
      case 'e3':
      case 'e5':
        this.vendorForm.patchValue({
          kmart: chk,
        });
        this.manageControl(chk, 'Testing');
        this.manageControl(chk, 'vendorAccount');
        this.manageControl(chk, 'kmart');
        switch (control) {
          case 'k1':
            this.manageControl(chk, 'e1');
            this.manageControl(chk, 'e3');
            this.manageControl(chk, 'e5');
            break;
          case 'e1':
            this.manageControl(chk, 'k1');
            this.manageControl(chk, 'e3');
            this.manageControl(chk, 'e5');
            break;
          case 'e3':
            this.manageControl(chk, 'k1');
            this.manageControl(chk, 'e1');
            this.manageControl(chk, 'e5');
            break;
          case 'e5':
            this.manageControl(chk, 'k1');
            this.manageControl(chk, 'e3');
            this.manageControl(chk, 'e1');
            break;
        }
        break;
      default:
        break;
    }
  }

  onAccountSubmit() {
    if (this.vendorForm.valid) {
      console.log(this.vendorForm.value);
    }
  }

  manageControl(condition: boolean, control: string) {
    const action = condition ? 'disable' : 'enable';
    this.vendorForm.controls[control][action]();
  }

  get c() {
    return this.vendorForm.controls;
  }
}
