import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SearchEnterpriseIdComponent } from './search-enterprise-id/search-enterprise-id.component';

@NgModule({
    declarations: [
        SearchEnterpriseIdComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule
    ],
    exports: [
        SearchEnterpriseIdComponent
    ]
})
export class SharedModule { }
