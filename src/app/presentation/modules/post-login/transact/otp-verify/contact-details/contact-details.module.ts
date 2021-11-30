import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactDetailsRoutingModule } from './contact-details-routing.module';
import { ContactDetailsComponent } from './contact-details.component';
import { MatStyleModule } from 'src/app/mat-style.module';


@NgModule({
  declarations: [
    ContactDetailsComponent
  ],
  imports: [
    CommonModule,
    ContactDetailsRoutingModule,
    MatStyleModule
  ]
})
export class ContactDetailsModule { }
