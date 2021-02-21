import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SideNav } from './sidenav-data';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuIcons: [] = [];
  leftSidebar: SideNav[] = [];
  activeCat: string;
  activeSub: string;

  constructor(private layoutService: LayoutService, private router: Router) {}

  ngOnInit(): void {
    this.getMenuIcons();
    this.layoutService.getLeftMenuJson().subscribe(
      (response) => {
        const userMenu = this.layoutService.getLocalStorage('userMenu');
        for (const key in response) {
          for (const k in response[key]) {
            if (userMenu.indexOf(response[key][k]['key']) > -1) {
              if (!this.leftSidebar[key]) {
                this.leftSidebar[key] = [];
              }
              this.leftSidebar[key].push(response[key][k]);
              if (`/${response[key][k]['link']}` == this.router.url) {
                this.activeCat = key;
                this.activeSub = response[key][k]['link'];
              }
            }
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getMenuIcons() {
    this.menuIcons['Access Utilities'] = 'pe-7s-rocket';
    this.menuIcons['IDM Tools'] = 'pe-7s-rocket';
  }
}
