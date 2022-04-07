import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MerchantAddedSuccessfulComponent } from './../../../presentation/shared/modals/add-merchant/merchant-added-successful/merchant-added-successful.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MerchantAddedSuccessfulService {

  data = new Subject<{ type: string; }>();

  dialogRef: any;

  constructor(private readonly dialog: MatDialog) { }

  open(data: any | null) {
    this.dialogRef =  this.dialog.open<MerchantAddedSuccessfulComponent>(MerchantAddedSuccessfulComponent, {
      disableClose: true,
      data
    });
    return this.dialogRef;
  } 

  close() {
    this.dialogRef.close()
  }
}
