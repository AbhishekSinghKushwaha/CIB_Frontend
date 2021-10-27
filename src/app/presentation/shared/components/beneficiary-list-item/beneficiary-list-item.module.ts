import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiaryListItemComponent } from './beneficiary-list-item.component'
import { FavouritesModalService } from 'src/app/core/services/favourites-modal/favourites-modal.service';
import { MatStyleModule } from 'src/app/mat-style.module';


@NgModule({
  declarations: [
    BeneficiaryListItemComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    BeneficiaryListItemComponent
  ],
  providers: [FavouritesModalService]
})
export class BeneficiaryListItemModule { }
