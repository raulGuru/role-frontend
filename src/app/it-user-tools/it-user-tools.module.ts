import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItUserToolsRoutingModule } from './it-user-tools-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { PipesModule } from '../pipes/pipes.module';
import { LookupComponent } from './lookup/lookup.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LookupComponent],
  imports: [
    CommonModule,
    ItUserToolsRoutingModule,
    LayoutModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class ItUserToolsModule { }
