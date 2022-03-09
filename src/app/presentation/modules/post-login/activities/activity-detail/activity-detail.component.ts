import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationCompletionModel } from 'src/app/core/domain/confirmation-completion.model';
import { ConfirmationModel } from 'src/app/core/domain/confirmation.model';
import { TransactionListmodel } from 'src/app/core/domain/transaction-list.model';
import { TransactionReceiptModalService } from 'src/app/core/services/modal-services/transaction-receipt-modal/transaction-receipt-modal.service';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { confirmModal } from 'src/app/presentation/shared/decorators/confirm-dialog.decorator';
import { SupportingDocumentsUploadService } from './../../../../../core/services/supporting-documents-upload/supporting-documents-upload.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {
  show = true;
  id: number;
  status: string;
  category: string;
  data: TransactionListmodel;
  transactionDetail: ConfirmationModel[] = mockData.transactionDetail;
  transactionIcon = { Approved: 'transaction_approved', Rejected: 'transaction_rejected', Pending: 'transaction_pending' };
  completionData: ConfirmationCompletionModel = {
    title: '',
    buttonText: 'Done',
    message: 'Transaction submitted for approval',
    subMessage: `<div>Transaction of 0.00 KES, daily transaction limit 0.00 KES was submitted on 16/04/2020 at 10:45:23 for approval.</div>
   <div>You will be notified once the transaction has been reviewed.</div>`,
    icon: 'assets/images/icons/visual-support-icons-virtual-account-submission-avatar.svg'
  }

  constructor(private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly transactionReceiptModalService: TransactionReceiptModalService) {
    this.id = route.snapshot.params['id'];
    this.category = route.snapshot.params['type'];
    this.data = (this.category === 'history' ? mockData.histororicalTransactions.find((_, i) => i === +this.id) : mockData.pendingTransactions.find((_, i) => i === this.id)) || mockData.pendingTransactions[0];
    console.log(this.data);
  }

  ngOnInit(): void {
  }

  openUploadModal() {
    this.supportingDocumentsUploadService.open()
  }

  openReceipt() {
    this.transactionReceiptModalService.open()
  }

  @confirmModal({
    title: 'Transaction request rejection',
    message: 'Reason for rejection',
    cancelText: 'Submit',
    confirmText: 'Cancel',
  })
  reject() {

  }

  approve() {
    this.router.navigate(['activities/verifyOTP'])
  }

  reinitiate() {
    this.status = 'Reinitiated';
  }

  confirmationDone(data: boolean) {

  }
}
