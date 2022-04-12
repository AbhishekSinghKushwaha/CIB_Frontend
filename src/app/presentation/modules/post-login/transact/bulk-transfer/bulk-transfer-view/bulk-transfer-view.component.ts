import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bulk-transfer-view',
  templateUrl: './bulk-transfer-view.component.html',
  styleUrls: ['./bulk-transfer-view.component.scss']
})
export class BulkTransferViewComponent implements OnInit {

  transactionIcon = { Active: 'transaction_approved', Inactive: 'transaction_pending' };

  constructor() { }

  ngOnInit(): void {
  }

  edit() {
    console.log('edit');
  }

  delete() {
    console.log('delete');
  }

}
