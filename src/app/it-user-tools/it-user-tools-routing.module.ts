import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '../layout/page-not-found/page-not-found.component';
import { AskComponent } from './ask/ask.component';
import { LookupPasswordComponent } from './lookup-password/lookup-password.component';
import { LookupComponent } from './lookup/lookup.component';
import { LookupresComponent } from './lookupres/lookupres.component';

const routes: Routes = [
  { path: 'lookup', component: LookupComponent },
  { path: 'ask', component: AskComponent },
  { path: 'lookupres', component: LookupresComponent },
  { path: 'lookuppw', component: LookupPasswordComponent },
  { path: '', pathMatch: 'full', redirectTo: 'lookup' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItUserToolsRoutingModule { }
