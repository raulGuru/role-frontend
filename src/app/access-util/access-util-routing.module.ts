import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '../layout/page-not-found/page-not-found.component';
import { DlSearchComponent } from './dl-search/dl-search.component';
import { DlViewComponent } from './dl-view/dl-view.component';
import { GroupEditorComponent } from './group-editor/group-editor.component';
import { RoleEditorComponent } from './role-editor/role-editor.component';
import { RoleSearchComponent } from './role-search/role-search.component';
import { RoleViewComponent } from './role-view/role-view.component';

const routes: Routes = [
  { path: 'role', component: RoleEditorComponent },
  { path: 'roleview', component: RoleViewComponent },
  { path: 'roleusers', component: RoleSearchComponent },
  { path: 'group', component: GroupEditorComponent },
  { path: 'dlview', component: DlViewComponent },
  { path: 'dlusers', component: DlSearchComponent },
  { path: '', pathMatch: 'full', redirectTo: 'role' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessUtilRoutingModule { }
