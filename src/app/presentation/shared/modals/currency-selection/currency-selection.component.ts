import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencySelectionConstants } from '../../../../core/utils/constants/currency-selection.constants';

@Component({
  selector: 'app-currency-selection',
  templateUrl: './currency-selection.component.html',
  styleUrls: ['./currency-selection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CurrencySelectionComponent implements OnInit {

  constructor(
    readonly dialogRef: MatDialogRef<CurrencySelectionComponent>,
    public readonly ownEquityCurrencyList: CurrencySelectionConstants
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }

}
