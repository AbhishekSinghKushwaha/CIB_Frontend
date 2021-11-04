import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { BeneficiaryManagementFormModalComponent } from 'src/app/presentation/shared/modals/beneficiary-management-form-modal/beneficiary-management-form-modal.component';
import { BeneficiaryModel } from '../../domain/beneficiary.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryManagementFormModalService {
  formValue = new Subject<BeneficiaryModel>();

  constructor(private readonly dialog: MatDialog) { }

  open(data?: BeneficiaryModel) {
    return this.dialog.open<BeneficiaryManagementFormModalComponent, BeneficiaryModel>(BeneficiaryManagementFormModalComponent, {
      maxWidth: '500px',
      disableClose: true,
      data
    });
  }

  setFormValue(value: BeneficiaryModel): void {
    this.formValue.next(value)
  }
}
