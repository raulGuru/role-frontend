import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessUtilRoutingModule } from './access-util-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { RoleEditorComponent } from './role-editor/role-editor.component';
import { RoleAssignmentComponent } from './role-assignment/role-assignment.component';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleViewComponent } from './role-view/role-view.component';
import { DlViewComponent } from './dl-view/dl-view.component';
import { RoleSearchComponent } from './role-search/role-search.component';
import { DlSearchComponent } from './dl-search/dl-search.component';
import { GroupEditorComponent } from './group-editor/group-editor.component';
import { GroupViewComponent } from './group-view/group-view.component';
import { GroupSearchComponent } from './group-search/group-search.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [RoleEditorComponent, RoleAssignmentComponent, RoleViewComponent, DlViewComponent, RoleSearchComponent, DlSearchComponent, GroupEditorComponent, GroupViewComponent, GroupSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    AccessUtilRoutingModule,
    LayoutModule,
    PipesModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule
  ]
})
export class AccessUtilModule { }
