import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent, PageNotFoundComponent],
  exports: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutModule { }
