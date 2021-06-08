import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  isLoggedIn: any;
  changeForm: FormGroup
  passwordIsValid: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.isLoggedIn = null;
    this.changeForm = new FormGroup({
      opuid: new FormControl('', Validators.required),
      currpassword: new FormControl('', Validators.required),
      newpassword: new FormControl('', Validators.required),
      confirmpassword: new FormControl('', Validators.required),
    }, { validators: this.passwordMatch });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getLocalStorage('user');
    if (this.isLoggedIn) {
      this.changeForm.patchValue({ opuid: this.isLoggedIn.uid })
    }
  }

  passwordValid(event): void {
    this.passwordIsValid = event;
  }

  passwordMatch(g: FormGroup) {
    return g.get('newpassword').value === g.get('confirmpassword').value
       ? null : {'mismatch': true};
  }

  async onSubmit() {
    if (this.changeForm.valid) {
      try {
        this.toastr.clear();
        this.toastr.info('Performing action...', 'Changing', {
          disableTimeOut: true,
        });
        let changeRes = await this.authService.changepassword(this.changeForm.value);
        if (changeRes.header.status == '1') {
          this.authService.handleResponseError();
        }
        this.toastr.clear();
        const {
          status, message, info
        } = changeRes.header.changepassword;
        if (status === '0') {
          Swal.fire({
            icon: 'success',
            title: 'Action performed successfully',
          }).then((res) => {
            this.changeForm.reset();
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
    return this.changeForm.controls;
  }

}
