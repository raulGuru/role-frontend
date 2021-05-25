import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { LayoutService } from 'src/app/layout/layout.service';
import { ItUserService } from '../it-user.service';

@Component({
  selector: 'app-change-c-to-a',
  templateUrl: './change-c-to-a.component.html',
  styleUrls: ['./change-c-to-a.component.scss'],
})
export class ChangeCToAComponent implements OnInit {
  chgc2aForm: FormGroup;
  contractors: [];
  associates: [];

  constructor(
    private itUserService: ItUserService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.chgc2aForm = new FormGroup({
      opuid: new FormControl(null, Validators.required),
      assoc: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  async getSelectList(event: any, type: string) {
    if (event.term.length < 3) return;
    const post = { opuid: event.term };
    try {
      this.toastr.clear();
      this.toastr.info('Searching...', 'Fetching List', {
        disableTimeOut: true,
      });
      let contractsRes: any;
      if (type === 'contr') {
        contractsRes = await this.itUserService.getContractors(post);
      } else {
        contractsRes = await this.itUserService.getAssociates(post);
      }
      if (contractsRes.header.status == '1') {
        this.layoutService.handleResponseError();
      }
      this.toastr.clear();
      const { status, message, info } =
        type === 'contr'
          ? contractsRes.header.getnonassociate
          : contractsRes.header.getassociate;
      if (status === '0') {
        if (type === 'contr') {
          this.contractors = contractsRes.data.getnonassociate;
        } else {
          this.associates = contractsRes.data.getassociate;
        }
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

  async onChngSub() {
    if (this.chgc2aForm.valid) {
      const { opuid, assoc } = this.chgc2aForm.value;
      const params = {
        cuid: opuid,
        auid: assoc,
      };
      try {
        this.toastr.clear();
        this.toastr.info('Performing action...', 'Converting', {
          disableTimeOut: true,
        });
        let chgc2aRes = await this.itUserService.convertcontractor(params);
        if (chgc2aRes.header.status == '1') {
          this.layoutService.handleResponseError();
        }
        this.toastr.clear();
        const { status, message, info } = chgc2aRes.header.convertcontractor;
        if (status === '0') {
          let sicon: any = 'success';
          let smsg: string = 'Action performed successfully';
          if(message !== 'OK') {
            sicon = 'warning'
            smsg = message.split('|').join('\n');
            smsg = `Conversion success with below warnings: </br>${smsg}`
          }
          Swal.fire({
            width: 1000,
            icon: sicon,
            title: smsg,
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

  get c() {
    return this.chgc2aForm.controls;
  }
}
