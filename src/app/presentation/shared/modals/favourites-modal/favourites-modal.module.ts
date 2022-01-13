import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavouritesModalComponent } from './favourites-modal.component';
// import { BeneficiaryListItemComponent } from '../../components/beneficiary-list-item/beneficiary-list-item.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FavouritesModalService } from 'src/app/core/services/modal-services/favourites-modal/favourites-modal.service';
import { FavouriteSearchPipe } from '../../pipes/favourites-search/favourite-search.pipe';
import { NewRecipientModalModule } from '../new-recipient-modal/new-recipient-modal.module';
import { BeneficiaryListItemModule } from '../../components/beneficiary-list-item/beneficiary-list-item.module';
import { FavouriteSearchPipeModule } from '../../pipes/favourites-search/favourite-search-pipe.module';
import { BeneficiaryManagementModalService } from 'src/app/core/services/beneficiary-management-modal/beneficiary-management-modal.service';
import { BeneficiaryManagementModalModule } from '../beneficiary-management-modal/beneficiary-management-modal.module';

@NgModule({
  declarations: [FavouritesModalComponent],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    NewRecipientModalModule,
    BeneficiaryListItemModule,
    FavouriteSearchPipeModule,
    BeneficiaryManagementModalModule,
  ],
  exports: [FavouritesModalComponent],
  providers: [FavouritesModalService, BeneficiaryManagementModalService],
})
export class FavouritesModalModule {}
