import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { UnixToolsRoutingModule } from './unix-tools-routing.module';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { LayoutModule } from '../layout/layout.module';
import { AddGroupComponent } from './add-group/add-group.component';
import { SearchGroupComponent } from './search-group/search-group.component';
import { ViewGrpDetailComponent } from './search-group/view-grp-detail/view-grp-detail.component';
import { GroupEditorComponent } from './group-editor/group-editor.component';
import { PipesModule } from '../pipes/pipes.module';
import { AddNetGroupComponent } from './add-net-group/add-net-group.component';
import { SearchNetGroupComponent } from './search-net-group/search-net-group.component';
import { ViewNetgrpDetailComponent } from './search-net-group/view-netgrp-detail/view-netgrp-detail.component';
import { NetGroupEditorComponent } from './net-group-editor/net-group-editor.component';
import { HostEditorComponent } from './host-editor/host-editor.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AddProfileComponent, AddGroupComponent, SearchGroupComponent, ViewGrpDetailComponent, GroupEditorComponent, AddNetGroupComponent, SearchNetGroupComponent, ViewNetgrpDetailComponent, NetGroupEditorComponent, HostEditorComponent],
  imports: [
    CommonModule,
    UnixToolsRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    PipesModule,
    SharedModule
  ],
})
export class UnixToolsModule {}
