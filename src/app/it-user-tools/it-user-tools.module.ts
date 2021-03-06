import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItUserToolsRoutingModule } from './it-user-tools-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { PipesModule } from '../pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { LookupComponent } from './lookup/lookup.component';
import { AskComponent } from './ask/ask.component';
import { LookupresComponent } from './lookupres/lookupres.component';
import { LookupPasswordComponent } from './lookup-password/lookup-password.component';
import { ReserveComponent } from './reserve/reserve.component';
import { ChangeUidComponent } from './change-uid/change-uid.component';
import { AddContractorComponent } from './add-contractor/add-contractor.component';
import { ChangeSsnComponent } from './change-ssn/change-ssn.component';
import { ChangeCToAComponent } from './change-c-to-a/change-c-to-a.component';
import { RenameContractorComponent } from './rename-contractor/rename-contractor.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { AddSaraVendorComponent } from './add-sara-vendor/add-sara-vendor.component';
import { SyncEmailComponent } from './sync-email/sync-email.component';


@NgModule({
  declarations: [LookupComponent, AskComponent, LookupresComponent, LookupPasswordComponent, ReserveComponent, ChangeUidComponent, AddContractorComponent, ChangeSsnComponent, ChangeCToAComponent, RenameContractorComponent, AddVendorComponent, AddSaraVendorComponent, SyncEmailComponent],
  imports: [
    CommonModule,
    ItUserToolsRoutingModule,
    LayoutModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    SharedModule
  ]
})
export class ItUserToolsModule { }
