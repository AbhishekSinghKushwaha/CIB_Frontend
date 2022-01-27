import { Component, OnInit, Input } from '@angular/core';
import { BankModel } from 'src/app/core/domain/bank.model';
import { BankService } from 'src/app/core/services/modal-services/bank.service';

@Component({
  selector: 'app-bank-list-item',
  templateUrl: './bank-list-item.component.html',
  styleUrls: ['./bank-list-item.component.scss'],
})
export class BankListItemComponent implements OnInit {
  @Input() data: BankModel;
  @Input() isChecked: boolean;

  constructor(private readonly bankService: BankService) {}

  ngOnInit(): void {}

  select(): void {
    this.bankService.select(this.data);
  }
}
