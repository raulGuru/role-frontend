import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItUserToolsRoutingModule } from './it-user-tools-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { PipesModule } from '../pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LookupComponent } from './lookup/lookup.component';
import { AskComponent } from './ask/ask.component';
import { LookupresComponent } from './lookupres/lookupres.component';
import { LookupPasswordComponent } from './lookup-password/lookup-password.component';
import { ReserveComponent } from './reserve/reserve.component';
import { ChangeUidComponent } from './change-uid/change-uid.component';
import { AddContractorComponent } from './add-contractor/add-contractor.component';


@NgModule({
  declarations: [LookupComponent, AskComponent, LookupresComponent, LookupPasswordComponent, ReserveComponent, ChangeUidComponent, AddContractorComponent],
  imports: [
    CommonModule,
    ItUserToolsRoutingModule,
    LayoutModule,
    PipesModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
  ]
})
export class ItUserToolsModule { }
