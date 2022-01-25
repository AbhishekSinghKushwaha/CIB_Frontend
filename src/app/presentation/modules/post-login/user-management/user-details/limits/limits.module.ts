import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitsComponent } from './limits.component';
import { LimitsRoutingModule } from './limits-routing.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencySelectionModule } from 'src/app/presentation/shared/modals/currency-selection/currency-selection.module';



@NgModule({
  declarations: [
    LimitsComponent
  ],
  imports: [
    LimitsRoutingModule,
    CommonModule,
    MatStyleModule,    
    FormElementsModule,    
    ReactiveFormsModule,
    CurrencySelectionModule
  ]
})
export class LimitsModule { }
