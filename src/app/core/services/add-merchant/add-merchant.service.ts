import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AddMerchantComponent } from 'src/app/presentation/shared/modals/add-merchant/add-merchant.component';
import { AddMerchantModel } from 'src/app/core/domain/add-merchant.model';

@Injectable({
  providedIn: 'root'
})
export class AddMerchantService {

  data = new Subject<{ type: string; }>();
  dialogRef: any;
  private defaultData: any;

  constructor(private readonly dialog: MatDialog) { }

  open(data: any | null) {
    this.dialogRef = this.dialog.open<AddMerchantComponent>(AddMerchantComponent, {
      disableClose: true,
      data
    });
    return this.dialogRef;
  }

  set(input: any): void {
    this.defaultData = { ...this.defaultData, ...input };
    this.data.next(this.defaultData);
  }

  get default(): any {
    return this.defaultData
  }

  close() {
    this.dialogRef.close()
  }
}
