import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EazzyFxTransactionTypeModalService } from '../eazzy-fx-transaction-type-modal/services/eazzy-fx-transation-type-modal.service';

@Component({
  selector: 'app-eazzy-fx-negotiate',
  templateUrl: './eazzy-fx-negotiate.component.html',
  styleUrls: ['./eazzy-fx-negotiate.component.scss'],
})
export class EazzyFxNegotiateComponent implements OnInit {
  negotiationFormGroup: FormGroup = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    schedulePayment: new FormControl('', [Validators.required]),
    transactionType: new FormControl('', [Validators.required]),
    reason: new FormControl('', []),
  });

  constructor(
    private readonly eazzyFxTransactionTypeModalService: EazzyFxTransactionTypeModalService
  ) {}

  ngOnInit(): void {}

  selectTransactionType(): void {
    const transactionType: 'sell' | 'buy' =
      this.negotiationFormGroup.get('transactionType')?.value;

    this.eazzyFxTransactionTypeModalService
      .open(transactionType)
      .subscribe((result: string | undefined) => {
        this.negotiationFormGroup.get('transactionType')?.setValue(result);
      });
  }

  negotiate(): void {}
}
