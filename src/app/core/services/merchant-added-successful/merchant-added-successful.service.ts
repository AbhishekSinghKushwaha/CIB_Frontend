import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MerchantAddedSuccessfulComponent } from './../../../presentation/shared/modals/add-merchant/merchant-added-successful/merchant-added-successful.component';

@Injectable({
  providedIn: 'root'
})
export class MerchantAddedSuccessfulService {

  dialogRef: any;

  constructor(private readonly dialog: MatDialog) { }

  open() {
    this.dialogRef =  this.dialog.open<MerchantAddedSuccessfulComponent>(MerchantAddedSuccessfulComponent, {
      disableClose: true,
    });
    return this.dialogRef;
  } 

  close() {
    this.dialogRef.close()
  }
}
