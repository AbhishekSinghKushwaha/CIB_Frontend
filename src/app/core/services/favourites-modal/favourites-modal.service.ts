import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FavouritesModalComponent } from 'src/app/presentation/shared/modals/favourites-modal/favourites-modal.component';
import { FavouriteBeneficiaryModel } from '../../domain/favourites-beneficiary.model';

@Injectable()
export class FavouritesModalService {

  selected = new Subject<FavouriteBeneficiaryModel>();
  private data:FavouriteBeneficiaryModel;

  constructor(private readonly dialog: MatDialog) { }

  open(data: FavouriteBeneficiaryModel[]): void {
    this.dialog.open<FavouritesModalComponent, FavouriteBeneficiaryModel[]>(FavouritesModalComponent, {
      disableClose: true,
      data
    });
  }

  select(account: FavouriteBeneficiaryModel): void {
    this.data = account
    this.selected.next(this.data)
  }

  get default():FavouriteBeneficiaryModel{
    return this.data
  }
}
