import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BankSelectionModel } from 'src/app/core/domain/bank-selection.model';
import { BankSelectionService } from 'src/app/core/services/bank-selection/bank-selection.service';


@Component({
  selector: 'app-bank-selection',
  templateUrl: './bank-selection.component.html',
  styleUrls: ['./bank-selection.component.scss']
})
export class BankSelectionComponent implements OnInit {
  @Input() isChecked: boolean;
  selected: BankSelectionModel;
  searchBank: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BankSelectionModel[],
    private readonly bankSelectionService: BankSelectionService) {
    this.selected = bankSelectionService.default;
    this.bankSelectionService.selected.subscribe((x) => this.selected = x);
  }

  ngOnInit(): void {
  }

}
