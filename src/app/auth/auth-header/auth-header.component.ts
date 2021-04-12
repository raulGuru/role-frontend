import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss']
})
export class AuthHeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isLoginPg: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getLocalStorage('user');
    if (this.router.url.indexOf('/auth/login') > -1) {
      this.isLoginPg = true;
      console.log(this.router.url);
    }
  }

}
