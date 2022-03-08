import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationModel } from 'src/app/core/domain/confirmation.model';
import { TransactionListmodel } from 'src/app/core/domain/transaction-list.model';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { SupportingDocumentsUploadService } from './../../../../../core/services/supporting-documents-upload/supporting-documents-upload.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {
  id: number;
  category: string;
  data: TransactionListmodel;
  transactionDetail: ConfirmationModel[] = mockData.transactionDetail;
  transactionIcon = { Approved: 'transaction_approved', Rejected: 'transaction_rejected', Pending: 'transaction_pending' };

  constructor(private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly route: ActivatedRoute) {
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
}
