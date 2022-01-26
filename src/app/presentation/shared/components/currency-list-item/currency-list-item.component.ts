import { Component, Input, OnInit } from '@angular/core';
import { CurrencyModel } from 'src/app/core/domain/transfer.models';
import { CurrencySelectionService } from 'src/app/core/services/modal-services/currency-selection.service';

@Component({
  selector: 'app-currency-list-item',
  templateUrl: './currency-list-item.component.html',
  styleUrls: ['./currency-list-item.component.scss'],
})
export class CurrencyListItemComponent implements OnInit {
  @Input() data: CurrencyModel;
  @Input() isChecked: boolean;

  constructor(
    private readonly currencySelectionService: CurrencySelectionService
  ) {}

  ngOnInit(): void {}

  select(): void {
    this.currencySelectionService.select(this.data);
  }
}
