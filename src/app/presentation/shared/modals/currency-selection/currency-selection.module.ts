import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencySelectionComponent } from './currency-selection.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { OwnequityModalService } from '../../../../core/services/ownequity-modal/ownequity-modal.service';
import { CurrencySelectionConstants } from '../../../../core/utils/constants/currency-selection.constants';
import { CurrencyListItemComponent } from '../../components/currency-list-item/currency-list-item.component';
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
    CurrencySelectionService,
    OwnequityModalService,
    CurrencySelectionConstants
  ]
})
export class CurrencySelectionModule { }
