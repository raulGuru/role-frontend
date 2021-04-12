import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoggedIn: boolean = false;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.registerForm = new FormGroup({
      opuid: new FormControl('', Validators.required),
      currpassword: new FormControl('', Validators.required),
      newpassphrase: new FormControl('', Validators.required),
      confirmpassphrase: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getLocalStorage('user');
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      try {
        this.toastr.clear();
        this.toastr.info('Performing action...', 'Registering', {
            disableTimeOut: true,
        });
        let changeRes = await this.authService.registerpassphrase(this.registerForm.value);
        if (changeRes.header.status == '1') {
            this.authService.handleResponseError();
        }
        this.toastr.clear();
        const {
            status, message, info
        } = changeRes.header.registerpassphrase;
        if (status === '0') {
            Swal.fire({
                icon: 'success',
                title: 'Action performed successfully',
            }).then((res) => {
              this.registerForm.reset();
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
    return this.registerForm.controls;
  }

}
