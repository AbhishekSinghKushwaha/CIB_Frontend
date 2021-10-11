import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencySelectionComponent } from './currency-selection.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { CurrencyListItemComponent } from './currency-list-item/currency-list-item.component';
import { CurrencySelectionService } from 'src/app/core/services/currency-selection/currency-selection.service';



@NgModule({
  declarations: [
    CurrencySelectionComponent,
    CurrencyListItemComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports:[
    CurrencySelectionComponent
  ],
  providers:[
    CurrencySelectionService
  ]
})
export class CurrencySelectionModule { }