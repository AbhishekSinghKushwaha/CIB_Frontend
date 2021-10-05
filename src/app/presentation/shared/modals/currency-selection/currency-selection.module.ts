import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencySelectionComponent } from './currency-selection.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { OwnequityModalService } from '../../../../core/services/ownequity-modal/ownequity-modal.service';
import { CurrencySelectionConstants } from '../../../../core/utils/constants/currency-selection.constants';



@NgModule({
  declarations: [
    CurrencySelectionComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports:[
    CurrencySelectionComponent
  ],
  providers:[
    OwnequityModalService,
    CurrencySelectionConstants
  ]
})
export class CurrencySelectionModule { }
