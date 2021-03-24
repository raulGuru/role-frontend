import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '../layout/page-not-found/page-not-found.component';
import { AddContractorComponent } from './add-contractor/add-contractor.component';
import { AddSaraVendorComponent } from './add-sara-vendor/add-sara-vendor.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { AskComponent } from './ask/ask.component';
import { ChangeCToAComponent } from './change-c-to-a/change-c-to-a.component';
import { ChangeSsnComponent } from './change-ssn/change-ssn.component';
import { ChangeUidComponent } from './change-uid/change-uid.component';
import { LookupPasswordComponent } from './lookup-password/lookup-password.component';
import { LookupComponent } from './lookup/lookup.component';
import { LookupresComponent } from './lookupres/lookupres.component';
import { RenameContractorComponent } from './rename-contractor/rename-contractor.component';
import { ReserveComponent } from './reserve/reserve.component';
import { SyncEmailComponent } from './sync-email/sync-email.component';

const routes: Routes = [
  { path: 'lookup', component: LookupComponent },
  { path: 'ask', component: AskComponent },
  { path: 'lookupres', component: LookupresComponent },
  { path: 'lookuppw', component: LookupPasswordComponent },
  { path: 'addreserve', component: ReserveComponent },
  { path: 'addreserve/:id', component: ReserveComponent },
  { path: 'chgaltuid', component: ChangeUidComponent },
  { path: 'chgssn', component: ChangeSsnComponent },
  { path: 'addcontractor', component: AddContractorComponent },
  { path: 'addcontractor/:id', component: AddContractorComponent },
  { path: 'chgc2a', component: ChangeCToAComponent },
  { path: 'renameid', component: RenameContractorComponent },
  { path: 'addvendor', component: AddVendorComponent },
  { path: 'addvendor/:id', component: AddVendorComponent },
  { path: 'addvendorsara', component: AddSaraVendorComponent },
  { path: 'addvendorsara/:id', component: AddSaraVendorComponent },
  { path: 'syncmail', component: SyncEmailComponent },
  { path: '', pathMatch: 'full', redirectTo: 'lookup' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItUserToolsRoutingModule { }
