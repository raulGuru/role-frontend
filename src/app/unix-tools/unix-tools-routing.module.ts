import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../layout/page-not-found/page-not-found.component';

import { AddProfileComponent } from './add-profile/add-profile.component';

const routes: Routes = [
  { path: 'addunixprof', component: AddProfileComponent },
  { path: '', pathMatch: 'full', redirectTo: 'addunixprof' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnixToolsRoutingModule {}
