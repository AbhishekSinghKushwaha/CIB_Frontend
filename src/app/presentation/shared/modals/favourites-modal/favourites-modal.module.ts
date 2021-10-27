import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavouritesModalComponent } from './favourites-modal.component';
// import { BeneficiaryListItemComponent } from '../../components/beneficiary-list-item/beneficiary-list-item.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FavouritesModalService } from 'src/app/core/services/favourites-modal/favourites-modal.service';
// import { FavouriteSearchPipe } from '../../pipes/favourite-search.pipe';
import { NewRecipientModalModule } from '../new-recipient-modal/new-recipient-modal.module';
import { BeneficiaryListItemModule } from '../../components/beneficiary-list-item/beneficiary-list-item.module';
import { FavouriteSearchModule } from '../../pipes/favourite-search/favourite-search.module';



@NgModule({
  declarations: [
    FavouritesModalComponent,
    // BeneficiaryListItemComponent,
    // FavouriteSearchPipe
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    NewRecipientModalModule,
    BeneficiaryListItemModule,
    FavouriteSearchModule
  ],
  exports: [
    FavouritesModalComponent
  ],
  providers: [FavouritesModalService]
})
export class FavouritesModalModule { }
