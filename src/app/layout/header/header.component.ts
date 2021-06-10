import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { LayoutService } from '../layout.service';
import { LayoutModalComponent } from '../layout-modal/layout-modal.component';
declare let $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any = {};
  inAuthModalRef: NgbModalRef;
  isTopbar: boolean;
  sidebar: boolean;

  constructor(
    public layoutService: LayoutService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.layoutService.getLocalStorage('user');
    if (!this.user) {
      this.layoutService.handleResponseError();
    }
    this.sidebar = JSON.parse(localStorage.getItem('sb'));
    if (this.sidebar) {
      $('body .app-container').addClass('closed-sidebar');
    } else {
      $('body .app-container').removeClass('closed-sidebar');
    }
    //this.passwordExpiryCheck();
  }

  toggelTopBar() {
    this.isTopbar = !this.isTopbar;
  }

  toggleSidebar() {
    this.sidebar = !this.sidebar;
    localStorage.setItem('sb', JSON.stringify(this.sidebar));
    if (this.sidebar) {
      $('body .app-container').addClass('closed-sidebar');
    } else {
      $('body .app-container').removeClass('closed-sidebar');
    }
  }

  onLogout() {
    this.layoutService.doLogout();
  }

  passwordExpiryCheck() {
    const expiresIn = this.user.password_expires;
    if (expiresIn < 11) {
      Swal.fire({
        icon: 'warning',
        title: `Your password expires soon. 
        Please change your password`,
      });
    }
  }

  inAuthentic() {
    this.inAuthModalRef = this.modalService.open(LayoutModalComponent, {
      size: 'sm',
      backdrop: 'static',
    });
    this.inAuthModalRef.componentInstance.userName = 'there';
    this.inAuthModalRef.componentInstance.content = `Session expired. Please login again.`;
    this.inAuthModalRef.result.then(
      (result) => {
        this.router.navigate(['/auth']);
      },
      (response) => {
        this.router.navigate(['/auth']);
      }
    );
  }
}
