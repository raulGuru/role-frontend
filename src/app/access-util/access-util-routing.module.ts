import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '../layout/page-not-found/page-not-found.component';
import { DlViewComponent } from './dl-view/dl-view.component';
import { RoleEditorComponent } from './role-editor/role-editor.component';
import { RoleViewComponent } from './role-view/role-view.component';

const routes: Routes = [
  { path: 'role', component: RoleEditorComponent },
  { path: 'roleview', component: RoleViewComponent },
  { path: 'dlview', component: DlViewComponent },
  { path: '', pathMatch: 'full', redirectTo: 'role' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessUtilRoutingModule { }