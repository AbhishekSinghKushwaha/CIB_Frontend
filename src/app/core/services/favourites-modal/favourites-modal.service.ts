import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FavouritesModalComponent } from 'src/app/presentation/shared/modals/favourites-modal/favourites-modal.component';
import { FavouriteBeneficiaryModel } from '../../domain/favourites-beneficiary.model';

@Injectable()
export class FavouritesModalService {

  selectedAccount = new Subject<FavouriteBeneficiaryModel>();

  constructor(private readonly dialog: MatDialog) { }

  open(data: FavouriteBeneficiaryModel[]): void {
    this.dialog.open<FavouritesModalComponent, FavouriteBeneficiaryModel[]>(FavouritesModalComponent, {
      disableClose: true,
      data
    });
  }

  selectAccount(account: FavouriteBeneficiaryModel): void {
    this.selectedAccount.next(account)
  }
}
