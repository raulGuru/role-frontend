import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '../layout/page-not-found/page-not-found.component';
import { AskComponent } from './ask/ask.component';
import { LookupComponent } from './lookup/lookup.component';

const routes: Routes = [
  { path: 'lookup', component: LookupComponent },
  { path: 'ask', component: AskComponent },
  { path: '', pathMatch: 'full', redirectTo: 'lookup' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItUserToolsRoutingModule { }
