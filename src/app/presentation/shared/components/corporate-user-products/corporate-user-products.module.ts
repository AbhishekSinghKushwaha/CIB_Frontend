import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';
import { LanguageTranslateModule } from 'src/app/translate.module';
import { FormElementsModule } from '../../form-elements/form-elements.module';
import { CorporateUserProductsComponent } from './corporate-user-products.component';
import { CorporateUserProductOptionsComponent } from '../corporate-user-product-options/corporate-user-product-options.component';

@NgModule({
  declarations: [
    CorporateUserProductsComponent,
    CorporateUserProductOptionsComponent
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
  exports: [CorporateUserProductsComponent, CorporateUserProductOptionsComponent]
})
export class CorporateUserProductsModule { }
