import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { IdLookupComponent } from './id-lookup/id-lookup.component';
import { SettingComponent } from './setting/setting.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'id-lookup', component: IdLookupComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'chng-password', component: ChangePasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'register-pass', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
