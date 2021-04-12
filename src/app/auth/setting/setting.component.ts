import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
})

export class SettingComponent implements OnInit {
    profile: any;
    loader: boolean = true;
    settingForm: FormGroup;

    constructor(
        private authService: AuthService,
        private toastr: ToastrService) {
        this.settingForm = new FormGroup({
            mailalternateaddress: new FormControl(),
            roomnumber: new FormControl(),
            telephonenumber: new FormControl(),
            mobile: new FormControl(),
            blackberryphonenumber: new FormControl(),
            alternatephonenumber: new FormControl(),
            fax: new FormControl(),
            pager: new FormControl()
        })
    }    

    ngOnInit(): void {
        this.getUserProfile();
    }

    async getUserProfile() {
        try {
            this.toastr.clear();
            this.toastr.info('Fetching Profile...', 'Settings', {
                disableTimeOut: true,
            });
            let userRes = await this.authService.getuserprofile();
            if (userRes.header.status == '1') {
                this.authService.handleResponseError();
            }
            this.toastr.clear();
            const {
                status, message
            } = userRes.header.getuserprofile;
            if (status === '0') {
                this.loader = false;
                this.profile = userRes.data.getuserprofile;
                const { mailalternateaddress, roomnumber, telephonenumber, mobile, blackberryphonenumber, alternatephonenumber, fax, pager } = userRes.data.getuserprofile;
                this.settingForm.patchValue({
                    mailalternateaddress,
                    roomnumber,
                    telephonenumber,
                    mobile,
                    blackberryphonenumber,
                    alternatephonenumber,
                    fax,
                    pager,
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

    async onSubmit() {
        if (this.settingForm.valid) {
            try {
                this.toastr.clear();
                this.toastr.info('Performing action...', 'Updating', {
                    disableTimeOut: true,
                });
                let updateRes = await this.authService.updateProfile(this.settingForm.value);
                if (updateRes.header.status == '1') {
                    this.authService.handleResponseError();
                }
                this.toastr.clear();
                const { status, message, info } = updateRes.header.userprofile;
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

    get c() {
        return this.settingForm.controls;
    }
}

