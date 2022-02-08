import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListModalComponent } from './company-list-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CompanyListModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CompanyListModalModule { }
