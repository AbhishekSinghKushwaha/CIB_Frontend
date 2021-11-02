import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BeneficiaryManagementModalComponent } from './beneficiary-management-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { BeneficiaryListItemModule } from '../../components/beneficiary-list-item/beneficiary-list-item.module';
import { BeneficiaryManagementModalService } from 'src/app/core/services/beneficiary-management-modal/beneficiary-management-modal.service';
import { FavouriteSearchPipeModule } from '../../pipes/favourites-search/favourite-search-pipe.module';

@NgModule({
  declarations: [
    BeneficiaryManagementModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BeneficiaryListItemModule,
    FavouriteSearchPipeModule,
    MatStyleModule
  ],
  exports: [
    BeneficiaryManagementModalComponent
  ],
  providers: [
    BeneficiaryManagementModalService
  ]
})
export class BeneficiaryManagementModalModule { }
