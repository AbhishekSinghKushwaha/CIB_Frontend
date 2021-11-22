import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { PesaLinkSendToComponent } from 'src/app/presentation/shared/modals/pesa-link-send-to/pesa-link-send-to.component';
import { FavouriteBeneficiaryModel } from '../../domain/favourites-beneficiary.model';

@Injectable()
export class PesaLinkSendToService {

  selected = new Subject<FavouriteBeneficiaryModel>();
  private data:FavouriteBeneficiaryModel;

  constructor(private readonly dialog: MatDialog) { }

  open(data: FavouriteBeneficiaryModel[]): void {
    this.dialog.open<PesaLinkSendToComponent, FavouriteBeneficiaryModel[]>(PesaLinkSendToComponent, {
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
