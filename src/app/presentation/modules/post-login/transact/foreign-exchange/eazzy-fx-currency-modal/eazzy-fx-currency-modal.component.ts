import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EazzyFixRate } from '../eazzy-fx-rate/eazzy-fx-rate.component';

@Component({
  selector: 'app-eazzy-fx-currency-modal',
  templateUrl: './eazzy-fx-currency-modal.component.html',
  styleUrls: ['./eazzy-fx-currency-modal.component.scss'],
})
export class EazzyFxCurrencyModalComponent implements OnInit {
  title: string = '';
  rates: EazzyFixRate[] = [];
  selectedIndex: number = -1;

  constructor(
    private readonly dialogRef: MatDialogRef<EazzyFxCurrencyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: any
  ) {
    this.title = data.title;
    this.rates = data.rates;
    this.selectedIndex = data.selectedIndex;
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }

  selectCurrency(index: number): void {
    const selectedRate: EazzyFixRate = this.rates[index];

    this.selectedIndex = index;

    this.dialogRef.close(index);
  }
}
