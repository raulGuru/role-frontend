import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '../layout/page-not-found/page-not-found.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { SearchGroupComponent } from './search-group/search-group.component';
import { GroupEditorComponent } from '../unix-tools/group-editor/group-editor.component';
import { AddNetGroupComponent } from './add-net-group/add-net-group.component';
import { SearchNetGroupComponent } from './search-net-group/search-net-group.component';
import { NetGroupEditorComponent } from './net-group-editor/net-group-editor.component';
import { HostEditorComponent } from './host-editor/host-editor.component';

const routes: Routes = [
  { path: 'addunixprof', component: AddProfileComponent },
  { path: 'addunixgroup', component: AddGroupComponent },
  { path: 'searchunixgroup', component: SearchGroupComponent },
  { path: 'unixgroup', component: GroupEditorComponent },
  { path: 'addunixnetgroup', component: AddNetGroupComponent },
  { path: 'searchunixnetgroup', component: SearchNetGroupComponent },
  { path: 'unixnetgroup', component: NetGroupEditorComponent },
  { path: 'unixnetgroupsrv', component: HostEditorComponent },
  { path: '', pathMatch: 'full', redirectTo: 'addunixprof' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnixToolsRoutingModule {}
