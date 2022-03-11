import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { UserDetailsRoutingModule } from './user-details-routing.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SelectAccountAccessModule } from 'src/app/presentation/shared/modals/select-account-access/select-account-access.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserDetailsComponent,
  ],
  imports: [
    UserDetailsRoutingModule,
    CommonModule,    
    MatStyleModule,
    FormElementsModule,    
    SelectAccountAccessModule,
    ReactiveFormsModule
  ]
})
export class UserDetailsModule {
 }
