import { Component, Input, OnInit } from '@angular/core';
import { BankSelectionModel } from 'src/app/core/domain/bank-selection.model';
import { BankSelectionService } from 'src/app/core/services/bank-selection/bank-selection.service';


@Component({
  selector: 'app-bank-selection-list-item',
  templateUrl: './bank-selection-list-item.component.html',
  styleUrls: ['./bank-selection-list-item.component.scss']
})
export class BankSelectionListItemComponent implements OnInit {

  @Input() isChecked: boolean;
  @Input() data: BankSelectionModel;
  constructor(private readonly bankSelectionService:BankSelectionService) { }

  ngOnInit(): void {
  }

  select(): void {
    this.bankSelectionService.select(this.data);
  }

}
