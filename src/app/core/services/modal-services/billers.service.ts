import { BillersModalComponent } from './../../../presentation/shared/modals/billers-modal/billers-modal.component';
import { BillersModel } from './../../domain/bank.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class BillersService {
  selected = new Subject<BillersModel>();
  private data: BillersModel;
  openedStatus = new Subject<boolean>();
  billersModalRef: MatDialogRef<BillersModalComponent, any>


  constructor(private readonly dialog: MatDialog) { }

  open(billers: BillersModel[]) {
    this.openedStatus.next(true);
    this.billersModalRef = this.dialog.open<BillersModalComponent, any>(
      BillersModalComponent,
      {
        disableClose: true,
        data: { billers },
      }
    );
    return this.billersModalRef;
  }


  selectBiller(biller: BillersModel): void {
    this.data = biller;
    this.selected.next(this.data);
  }

  closeBillersModal(data: BillersModel): void {
    this.selectBiller(data);
    this.billersModalRef.close(data);
  }
}
