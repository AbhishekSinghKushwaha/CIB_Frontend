import { Component, OnInit, Input } from '@angular/core';
import { TransferTypeModalService } from 'src/app/core/services/transaction-type-modal/transaction-type-modal.service';

@Component({
  selector: 'app-transaction-type-list-item',
  templateUrl: './transaction-type-list-item.component.html',
  styleUrls: ['./transaction-type-list-item.component.scss'],
})
export class TransactionTypeListItemComponent implements OnInit {
  @Input() data: any;
  @Input() isChecked: boolean;

  constructor(
    private readonly transactionTypeModalService: TransferTypeModalService
  ) {}

  ngOnInit(): void {}

  select(): void {
    this.transactionTypeModalService.select(this.data);
  }
}
