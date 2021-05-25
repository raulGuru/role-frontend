import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  isLoggedIn: any;
  resetForm: FormGroup

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.isLoggedIn = null;
    this.resetForm = new FormGroup({
      opuid: new FormControl('', Validators.required),
      altpass: new FormControl('', Validators.required),
      newpassword: new FormControl('', Validators.required),
      confirmpassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getLocalStorage('user');
    if (this.isLoggedIn) {
      this.resetForm.patchValue({ opuid: this.isLoggedIn.uid })
    }
  }

  async onSubmit() {
    if (this.resetForm.valid) {
      try {
        this.toastr.clear();
        this.toastr.info('Performing action...', 'Resetting', {
            disableTimeOut: true,
        });
        let changeRes = await this.authService.resetpassword(this.resetForm.value);
        if (changeRes.header.status == '1') {
            this.authService.handleResponseError();
        }
        this.toastr.clear();
        const {
            status, message, info
        } = changeRes.header.resetpassword;
        if (status === '0') {
            Swal.fire({
                icon: 'success',
                title: 'Action performed successfully',
            }).then((res) => {
              this.resetForm.reset();
              this.authService.doLogout();
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
    return this.resetForm.controls;
  }

}
