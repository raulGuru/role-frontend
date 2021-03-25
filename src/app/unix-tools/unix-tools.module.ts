import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { UnixToolsRoutingModule } from './unix-tools-routing.module';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [AddProfileComponent],
  imports: [
    CommonModule,
    UnixToolsRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
  ],
})
export class UnixToolsModule {}