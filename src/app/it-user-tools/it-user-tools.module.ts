import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItUserToolsRoutingModule } from './it-user-tools-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { PipesModule } from '../pipes/pipes.module';
import { LookupComponent } from './lookup/lookup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AskComponent } from './ask/ask.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LookupresComponent } from './lookupres/lookupres.component';
import { LookupPasswordComponent } from './lookup-password/lookup-password.component';


@NgModule({
  declarations: [LookupComponent, AskComponent, LookupresComponent, LookupPasswordComponent],
  imports: [
    CommonModule,
    ItUserToolsRoutingModule,
    LayoutModule,
    PipesModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    FormsModule,
    NgbModule
  ]
})
export class ItUserToolsModule { }
