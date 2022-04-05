import { Component, OnInit, Input } from '@angular/core';
import { TransactionTypeService } from 'src/app/core/services/transaction-type/transaction-type.service';


@Component({
  selector: 'app-select-transaction-type-list',
  templateUrl: './select-transaction-type-list.component.html',
  styleUrls: ['./select-transaction-type-list.component.scss']
})
export class SelectTransactionTypeListComponent implements OnInit {

  @Input() data: any;

  constructor(
    private readonly transactionTypeService: TransactionTypeService
  ) {}

  ngOnInit(): void {}

  select(): void {
    this.transactionTypeService.select(this.data);
    this.transactionTypeService.close();
  }

}
