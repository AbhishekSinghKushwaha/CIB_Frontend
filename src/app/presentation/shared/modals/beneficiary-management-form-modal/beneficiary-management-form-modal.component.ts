import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { BeneficiaryManagementFormModalService } from 'src/app/core/services/beneficiary-management-form-modal/beneficiary-management-form-modal.service';
import { BeneficiaryModel } from 'src/app/core/domain/beneficiary.model';
import SharedUtils from './../../../../core/utils/shared.util';
import { NotificationModalService } from 'src/app/core/services/modal-services/notification-modal/notification-modal.service';

@Component({
  selector: 'app-beneficiary-management-form-modal',
  templateUrl: './beneficiary-management-form-modal.component.html',
  styleUrls: ['./beneficiary-management-form-modal.component.scss'],
})
export class BeneficiaryManagementFormModalComponent implements OnInit {
  visibility = true;
  modalMode = true;

  constructor(
    readonly dialogRef: MatDialogRef<BeneficiaryManagementFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BeneficiaryModel,
    private readonly beneficiaryManagementFormModalService: BeneficiaryManagementFormModalService,
    private readonly notificationModalService: NotificationModalService
  ) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close(true);
  }

  submitForm(value: BeneficiaryModel): void {
    this.visibility = false;
    if (value) {
      const message = SharedUtils.getNotificationModalParam({
        title: 'Your beneficiary has been added',
        message: `A new beneficiary has been added to your list.
        You can now send them money or buy them airtime at anytime`,
        buttonText: 'Done',
      });
      const modal = this.notificationModalService.open(message);
      this.visibility = false;
      modal.afterClosed().subscribe(() => {
        this.close();
      });
    }
  }
}
