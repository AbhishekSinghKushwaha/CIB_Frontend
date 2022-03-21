import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';
import { LanguageTranslateModule } from 'src/app/translate.module';
import { CorporateUserFormComponent } from './corporate-user-form.component';
import { FormElementsModule } from '../../form-elements/form-elements.module';

@NgModule({
  declarations: [
    CorporateUserFormComponent
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
  exports: [CorporateUserFormComponent]
})
export class CorporateUserFormModuleModule { }
