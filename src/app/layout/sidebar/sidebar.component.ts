import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { SideNav } from './sidenav-data';
import { LayoutService } from '../layout.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

declare let $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @ViewChild('menuElement') metismenu: any;
  menuIcons: [] = [];
  leftSidebar: SideNav[] = [];
  activeCat: string;
  activeSub: string;
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private layoutService: LayoutService,
    private router: Router,
    public el: ElementRef) { }

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
              //if (`/${response[key][k]['link']}` == this.router.url) {
              if (this.router.url.indexOf(response[key][k]['link']) > -1) {
                this.activeCat = key;
                this.activeSub = response[key][k]['link'];
              }
              this.loadMetisMenu();
            }
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadMetisMenu() {
    setTimeout(() => {
      this.metismenu = this.el.nativeElement.querySelector('#metismenu');
      $(this.metismenu).metisMenu('dispose');
      $(this.metismenu).metisMenu();
    }, 200);
  }

  getMenuIcons() {
    this.menuIcons['Access Utilities'] = 'pe-7s-rocket';
    this.menuIcons['IDM Tools'] = 'pe-7s-rocket';
    this.menuIcons['IT and User Tools'] = 'pe-7s-rocket';
    this.menuIcons['Unix Tools'] = 'pe-7s-rocket';
  }
}
