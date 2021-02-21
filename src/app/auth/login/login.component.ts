import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    //localStorage.clear();
  }

  async onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.isLoading = true;
    // console.log(form.value); return
    try {
      let response = await this.authService.login(
        form.value.enterpriseID,
        form.value.password
      );
      if (response.header.status === '0') {
        this.authService.setLocalStorage('userMenu', response.data.access);
        const user = {
          name: response.data.attrs?.cn || '',
          title: response.data.attrs?.title || '',
          password_expires: response.data.password_expires || 0,
        };
        this.authService.setLocalStorage('user', user);
        this.router.navigate(['/access/role']);
      } else if (response.header.status === 1) {

      } else if (response.header.status === -1) {
        // this.toastr.error(response.message, 'Error!', {
        //   timeOut: 2000,
        // });
      }
    } catch (error) {}
  }
}
