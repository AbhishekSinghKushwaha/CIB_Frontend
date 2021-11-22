import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencySelectionModal } from 'src/app/core/domain/currency-selection.model';
import { CurrencyModel } from 'src/app/core/domain/transfer.models';
import { CurrencySelectionService } from 'src/app/core/services/currency-selection/currency-selection.service';
import { CurrencySelectionConstants } from '../../../../core/utils/constants/currency-selection.constants';

@Component({
  selector: 'app-currency-selection',
  templateUrl: './currency-selection.component.html',
  styleUrls: ['./currency-selection.component.scss'],
})
export class CurrencySelectionComponent implements OnInit {
  selected: CurrencyModel;

  constructor(
    private readonly dialogRef: MatDialogRef<CurrencySelectionComponent>,
    private readonly currencySelectionService: CurrencySelectionService,
    @Inject(MAT_DIALOG_DATA) public data: CurrencyModel[],
  ) {
    this.selected = this.currencySelectionService.default;
    this.currencySelectionService.selected.subscribe((x) => this.selected = x);}

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }

}