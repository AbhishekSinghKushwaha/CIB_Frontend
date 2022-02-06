import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { TransferToModalComponent } from 'src/app/presentation/shared/modals/transfer-to-modal/transfer-to-modal.component';
import { FromAccount } from '../../domain/transfer.models';

@Injectable({
  providedIn: 'root',
})
export class TransferToService {
  selectedTransferToAccount = new Subject<FromAccount>();
  selectedFavourite = new Subject<any>(); // Favourite Model
  transferToModalRef: MatDialogRef<TransferToModalComponent, any>;
  private transferToData: FromAccount;
  private favouriteData: any;
  constructor(private readonly dialog: MatDialog) {}

  // Opens Transfer To Modal
  openTransferToModal(data: any): void {
    this.transferToModalRef = this.dialog.open<TransferToModalComponent, any>(
      TransferToModalComponent,
      { disableClose: true, data }
    );
  }

  // Get the default data
  get defaulTransferToAccount(): FromAccount {
    return this.transferToData;
  }

  // Select account to transfer from
  selectTransferToAccount(account: FromAccount): void {
    this.transferToData = account;
    this.selectedTransferToAccount.next(account);
  }

  // Get the default data
  get defaultFavourite(): FromAccount {
    return this.favouriteData;
  }

  // Select Favourite account to transfer to from favourites list
  selectFavourite(account: any): void {
    this.favouriteData = account;
    this.selectedFavourite.next(account);
  }

  closeTransferToModal() {
    this.transferToModalRef.close();
  }

  // OWN EQUITY ACCOUNT

  // BUY GOODS

  // SWIFT
}
