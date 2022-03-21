import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { UserDetailsRoutingModule } from './user-details-routing.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SelectAccountAccessModule } from 'src/app/presentation/shared/modals/select-account-access/select-account-access.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CorporateUserFormModuleModule } from 'src/app/presentation/shared/components/corporate-user-form/corporate-user-form.module';
import { CorporateUserRolesComponent } from 'src/app/presentation/shared/components/corporate-user-roles/corporate-user-roles.component';
import { RolesComponent } from './roles/roles.component';
import { CorporateUserRolesModule } from 'src/app/presentation/shared/components/corporate-user-roles/corporate-user-roles.module';

@NgModule({
  declarations: [
    UserDetailsComponent,
    RolesComponent
  ],
  imports: [
    UserDetailsRoutingModule,
    CommonModule,
    MatStyleModule,
    FormElementsModule,
    SelectAccountAccessModule,
    ReactiveFormsModule,
    CorporateUserFormModuleModule,
    CorporateUserRolesModule
  ]
})
export class UserDetailsModule {
}
