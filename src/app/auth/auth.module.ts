import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { IdLookupComponent } from './id-lookup/id-lookup.component';
import { RegisterComponent } from './register/register.component';
import { AuthHeaderComponent } from './auth-header/auth-header.component';
import { SettingComponent } from './setting/setting.component';
import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent, ChangePasswordComponent, IdLookupComponent, RegisterComponent, AuthHeaderComponent, SettingComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
    SharedModule
  ]
})
export class AuthModule { }
