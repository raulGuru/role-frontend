import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { ItUserService } from '../it-user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-contractor',
  templateUrl: './add-contractor.component.html',
  styleUrls: ['./add-contractor.component.scss'],
})
export class AddContractorComponent implements OnInit {
  gentype = [
    { id: 'u', name: 'Unspecified' },
    { id: 'a', name: 'Appliance Hardware' },
    { id: 't', name: 'Automotive Technician' },
    { id: 'd', name: 'Dealer Store' },
    { id: 'o', name: 'Outlet Store' },
  ];
  orgs = [];
  contractorForm: FormGroup;
  businessCats: any;
  businessUnits: any;
  disable: boolean = false;
  uidReadOnly: boolean;
  opuid: string;

  constructor(
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.contractorForm = new FormGroup({
      givenname: new FormControl('', Validators.required),
      sn: new FormControl('', Validators.required),
      uid: new FormControl('', Validators.required),
      o: new FormControl(null, Validators.required),
      dept: new FormControl('', Validators.required),
      ssn: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      emplid: new FormControl(''),
      procid: new FormControl(''),
      expire: new FormControl(''),
      manager: new FormControl(''),
      room: new FormControl(''),
      shcloc: new FormControl(null),
      buscat: new FormControl(null),
      gentype: new FormControl(null),
      generic: new FormControl(),
      vendor: new FormControl(),
      nonexpiry: new FormControl(),
      testing: new FormControl(),
      procurement: new FormControl(),
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
        this.businessCats = response;
      },
      (error) => {
        window.alert(error);
      }
    );

    this.itUserService.getBusinessUnits().then(
      (response) => {
        this.businessUnits = response;
      },
      (error) => {
        window.alert(error);
      }
    );
    this.opuid = this.route.snapshot.paramMap.get('id');
    if (this.opuid) {
      this.getnonassociate(this.opuid);
    }
  }

  async getnonassociate(opuid: string) {
    try {
      this.toastr.clear();
      this.toastr.info('Searching...', 'Searching Enterprise ID', {
        disableTimeOut: true,
      });
      let getContractorRes = await this.itUserService.getnonassociate({
        opuid,
      });
      if (getContractorRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, info } = getContractorRes.header.getnonassociate;
      if (status === '0') {
        this.patchContractorValues(getContractorRes.data.getnonassociate);
        this.patchChkBxs(getContractorRes.data.getnonassociate);
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

  patchChkBxs(data: any) {
    for (const control in data) {
      const chk = data[control];
      if (chk === true) this.handleControl(chk, control);
    }
  }

  patchContractorValues(data: any) {
    const {
      givenname,
      sn,
      uid,
      o,
      dept,
      ssn,
      title,
      emplid,
      procid,
      expire,
      manager,
      room,
      shcloc,
      buscat,
      gentype,
      generic,
      vendor,
      nonexpiry,
      testing,
      procurement,
      kmart,
      sears2,
      vpn,
      k1,
      e1,
      e3,
      e5,
    } = data;
    this.contractorForm.patchValue({
      givenname,
      sn,
      uid,
      o,
      dept,
      ssn,
      title,
      emplid,
      procid,
      expire,
      manager,
      room,
      shcloc,
      buscat,
      gentype,
      generic,
      vendor,
      nonexpiry,
      testing,
      procurement,
      kmart,
      sears2,
      vpn,
      k1,
      e1,
      e3,
      e5,
    });
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
    const { givenname, sn } = this.contractorForm.value;
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
          this.contractorForm.patchValue({ uid });
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

  async onAccountSubmit() {
    if (this.contractorForm.valid) {
      let params = {};
      /*
      const formVals = this.contractorForm.value;
      for (const key in formVals) {
        const element = formVals[key];
        if (key === 'buscat' || key === 'shcloc') {
          params[key] = !element ? '' : element;
        } else {
          params[key] = element === null ? false : element;
        }
      }
      */
      const {
        givenname,
        sn,
        uid,
        o,
        dept,
        ssn,
        title,
        emplid,
        procid,
        expire,
        manager,
        room,
        shcloc,
        buscat,
        gentype,
        generic,
        vendor,
        nonexpiry,
        testing,
        procurement,
        kmart,
        sears2,
        vpn,
        k1,
        e1,
        e3,
        e5,
      } = this.contractorForm.value;
      params['givenname'] = givenname;
      params['sn'] = sn;
      params['uid'] = uid;
      params['o'] = o;
      params['dept'] = dept;
      params['ssn'] = ssn;
      params['title'] = title;
      params['emplid'] = emplid;
      params['procid'] = procid;
      params['expire'] = expire;
      params['manager'] = manager;
      params['room'] = room;
      params['shcloc'] = !shcloc ? '' : shcloc;
      params['buscat'] = !buscat ? '' : buscat;
      params['gentype'] = !gentype ? '' : gentype;
      params['generic'] = !generic ? false : generic;
      params['vendor'] = !vendor ? false : vendor;
      params['nonexpiry'] = !nonexpiry ? false : nonexpiry;
      params['testing'] = !testing ? false : testing;
      params['procurement'] = !procurement ? false : procurement;
      params['kmart'] = !kmart ? false : kmart;
      params['sears2'] = !sears2 ? false : sears2;
      params['vpn'] = !vpn ? false : vpn;
      params['k1'] = !k1 ? false : k1;
      params['e1'] = !e1 ? false : e1;
      params['e3'] = !e3 ? false : e3;
      params['e5'] = !e5 ? false : e5;
      params['operation'] = this.opuid ? 'modify' : 'add';
      try {
        this.toastr.clear();
        this.toastr.info('Performing action...', 'On Contractor', {
          disableTimeOut: true,
        });
        let actionRes = await this.itUserService.nonassociate(params);
        if (actionRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, info } = actionRes.header.nonassociate;
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

  handleControl(chk: boolean, control: string) {
    switch (control) {
      case 'generic':
        this.manageControl(chk, 'testing');
        this.manageControl(chk, 'procurement');
        this.manageControl(chk, 'sears2');
        break;
      case 'vendor':
        this.manageControl(chk, 'testing');
        this.manageControl(chk, 'procurement');
        this.manageControl(chk, 'kmart');
        this.manageControl(chk, 'sears2');
        this.manageControl(chk, 'k1');
        this.manageControl(chk, 'e1');
        this.manageControl(chk, 'e3');
        this.manageControl(chk, 'e5');
        break;
      case 'testing':
        this.manageControl(chk, 'generic');
        this.manageControl(chk, 'vendor');
        this.manageControl(chk, 'nonexpiry');
        this.manageControl(chk, 'procurement');
        this.manageControl(chk, 'vpn');
        this.manageControl(chk, 'kmart');
        this.manageControl(chk, 'sears2');
        this.manageControl(chk, 'k1');
        this.manageControl(chk, 'e1');
        this.manageControl(chk, 'e3');
        this.manageControl(chk, 'e5');
        break;
      case 'nonexpiry':
        this.manageControl(chk, 'vendor');
        this.manageControl(chk, 'testing');
        this.manageControl(chk, 'procurement');
        this.manageControl(chk, 'vpn');
        this.manageControl(chk, 'kmart');
        this.manageControl(chk, 'sears2');
        this.manageControl(chk, 'k1');
        this.manageControl(chk, 'e1');
        this.manageControl(chk, 'e3');
        this.manageControl(chk, 'e5');
        break;
      case 'procurement':
        this.manageControl(chk, 'testing');
        this.manageControl(chk, 'generic');
        this.manageControl(chk, 'vendor');
        break;
      case 'kmart':
        this.manageControl(chk, 'testing');
        this.manageControl(chk, 'vendor');
        break;
      case 'sears2':
        this.manageControl(chk, 'testing');
        this.manageControl(chk, 'generic');
        this.manageControl(chk, 'vendor');
        break;
      case 'vpn':
        this.manageControl(chk, 'testing');
        this.manageControl(chk, 'nonexpiry');
        break;
      case 'k1':
      case 'e1':
      case 'e3':
      case 'e5':
        this.contractorForm.patchValue({
          kmart: chk,
        });
        this.manageControl(chk, 'testing');
        this.manageControl(chk, 'vendor');
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

  manageControl(condition: boolean, control: string) {
    const action = condition ? 'disable' : 'enable';
    this.contractorForm.controls[control][action]();
    this.contractorForm.patchValue({
      control: false,
    });
  }

  get c() {
    return this.contractorForm.controls;
  }
}
