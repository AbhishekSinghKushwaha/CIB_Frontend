import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatementRoutingModule } from './statement-routing.module';
import { StatementComponent } from './statement.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';


@NgModule({
  declarations: [
    StatementComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    ReactiveFormsModule,
    StatementRoutingModule,
    FormElementsModule,
  ]
})
export class StatementModule { }
