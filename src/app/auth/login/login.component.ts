import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';

import { AuthService } from '../auth.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errMsg: string | null;
  isLoading: boolean;
  constructor(public authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {
    this.errMsg = null;
    this.isLoading = false;
  }

  ngOnInit(): void {
    //localStorage.clear();
  }

  async onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.toastr.clear();
    this.toastr.info('Logging...', 'Checking');
    this.errMsg = null;
    try {
      let response = await this.authService.login(
        form.value.enterpriseID,
        form.value.password
      );
      const { message, status } = response.header;
      if (status === '0') {
        this.toastr.success('Login successful...', 'Awesome');
        this.authService.setLocalStorage('userMenu', response.data.access);
        const user = {
          name: response.data.attrs?.cn || '',
          title: response.data.attrs?.title || '',
          uid: response.data.attrs?.uid || '',
          password_expires: response.data.password_expires || 0,
        };
        this.authService.setLocalStorage('user', user);
        this.passwordExpiryCheck(user);
        this.router.navigate(['/access/role']);
      } else {
        this.toastr.error('Login failed...', 'Try again');
        this.isLoading = false;
        this.errMsg = message;
      }
    } catch (error) { }
  }

  passwordExpiryCheck(user: any) {
    const expiresIn = user.password_expires;
    if (expiresIn < 11) {
      Swal.fire({
        icon: 'warning',
        title: `Your password expires soon. 
        Please change your password`,
      });
    }
  }
}
