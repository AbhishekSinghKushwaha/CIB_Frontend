
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FavouritesModalModule } from './../../../../shared/modals/favourites-modal/favourites-modal.module';
import { OtherEquityAccountRoutingModule } from './other-equity-account-routing.module';
import { OtherEquityAccountComponent } from './other-equity-account.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SelectAccountModalModule } from './../../../../shared/modals/select-account-modal/select-account-modal.module';
import { CurrencySelectionModule } from 'src/app/presentation/shared/modals/currency-selection/currency-selection.module';


@NgModule({
  declarations: [
    OtherEquityAccountComponent
  ],
  imports: [
    CommonModule,
    OtherEquityAccountRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    ReactiveFormsModule,
    FavouritesModalModule,
    SelectAccountModalModule,
    CurrencySelectionModule
  ],
  providers: []
})
export class OtherEquityAccountModule { }
