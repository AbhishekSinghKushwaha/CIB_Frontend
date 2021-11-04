import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { BeneficiaryManagementFormModalService } from 'src/app/core/services/beneficiary-management-form-modal/beneficiary-management-form-modal.service';
import { BeneficiaryModel } from 'src/app/core/domain/beneficiary.model';

@Component({
  selector: 'app-beneficiary-management-form-modal',
  templateUrl: './beneficiary-management-form-modal.component.html',
  styleUrls: ['./beneficiary-management-form-modal.component.scss']
})
export class BeneficiaryManagementFormModalComponent implements OnInit {
  formValue: BeneficiaryModel

  constructor(
    readonly dialogRef: MatDialogRef<BeneficiaryManagementFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BeneficiaryModel,
    private readonly beneficiaryManagementFormModalService: BeneficiaryManagementFormModalService) {
    this.beneficiaryManagementFormModalService.formValue.subscribe((x) => { this.formValue = x; });
  }

  ngOnInit(): void {
  }


  close(): void {
    this.dialogRef.close(true);
  }
}
