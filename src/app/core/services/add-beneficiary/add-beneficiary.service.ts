import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AddBeneficiaryComponent } from 'src/app/presentation/shared/modals/airtime-success/add-beneficiary/add-beneficiary.component';
import { AddBeneficiaryModel } from 'src/app/core/domain/add-beneficiary.model';

@Injectable({
  providedIn: 'root'
})
export class AddBeneficiaryService {

  data = new Subject<AddBeneficiaryModel>();
  dialogRef: any;
  private defaultData:AddBeneficiaryModel;

  constructor(private readonly dialog: MatDialog) { }

  open(data: AddBeneficiaryModel | null) {
    this.dialogRef = this.dialog.open<AddBeneficiaryComponent, AddBeneficiaryModel>(AddBeneficiaryComponent, {
      disableClose: true,
      data
    });
    return this.dialogRef;
  }

  set(input: any): void {
    this.defaultData = { ...this.defaultData, ...input };
    this.data.next(this.defaultData);
  }

  get default(): AddBeneficiaryModel {
    return this.defaultData
  }

  close() {
    this.dialogRef.close()
  }
}
