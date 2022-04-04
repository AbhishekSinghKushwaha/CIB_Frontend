import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';
import { LanguageTranslateModule } from 'src/app/translate.module';
import { FormElementsModule } from '../../form-elements/form-elements.module';
import { CorporateUserRolesComponent } from './corporate-user-roles.component';

@NgModule({
  declarations: [
    CorporateUserRolesComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FormElementsModule,
    LanguageTranslateModule.forRoot(),

  ],
  exports: [CorporateUserRolesComponent]
})
export class CorporateUserRolesModule { }
