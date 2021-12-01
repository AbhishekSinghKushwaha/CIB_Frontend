import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyByCodeComponent } from './verify-by-code.component';
import { MatStyleModule } from './../../../../mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    VerifyByCodeComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    VerifyByCodeComponent
  ]
})
export class VerifyByCodeModule { }
