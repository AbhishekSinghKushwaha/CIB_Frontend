import { Component, OnInit } from '@angular/core';
import { TransactionReceiptModalService } from 'src/app/core/services/modal-services/transaction-receipt-modal/transaction-receipt-modal.service';

@Component({
  selector: 'app-transaction-receipt-modal',
  templateUrl: './transaction-receipt-modal.component.html',
  styleUrls: ['./transaction-receipt-modal.component.scss']
})
export class TransactionReceiptModalComponent implements OnInit {
  view = 'main';
  downloadOptions = ['PDF', 'CSV', 'MT840', 'Excel']
  constructor(private readonly transactionReceiptModalService: TransactionReceiptModalService) { }

  ngOnInit(): void {
  }

  close() {
    this.transactionReceiptModalService.close()
  }

  setView() {
    this.view = 'download';
  }

}
