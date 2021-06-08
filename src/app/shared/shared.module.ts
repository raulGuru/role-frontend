import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SearchEnterpriseIdComponent } from './search-enterprise-id/search-enterprise-id.component';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';

@NgModule({
    declarations: [
        SearchEnterpriseIdComponent,
        PasswordStrengthComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule
    ],
    exports: [
        SearchEnterpriseIdComponent,
        PasswordStrengthComponent
    ]
})
export class SharedModule { }
