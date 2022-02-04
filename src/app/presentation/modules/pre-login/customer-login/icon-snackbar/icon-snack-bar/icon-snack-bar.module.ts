import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatStyleModule } from 'src/app/mat-style.module';
import {IconSnackBarComponent} from './icon-snack-bar.component';


@NgModule({
  declarations: [
    IconSnackBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStyleModule,
    IconSnackBarComponent
  ]
})
export class SnackBarModule { }
