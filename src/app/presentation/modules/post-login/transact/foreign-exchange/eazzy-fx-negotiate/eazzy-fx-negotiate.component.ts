import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationCompletionModel } from 'src/app/core/domain/confirmation-completion.model';
import { EazzyFxTransactionTypeModalService } from '../eazzy-fx-transaction-type-modal/services/eazzy-fx-transation-type-modal.service';
import { EazzyFxRateService } from '../services/eazzy-fx-rate.service';

@Component({
  selector: 'app-eazzy-fx-negotiate',
  templateUrl: './eazzy-fx-negotiate.component.html',
  styleUrls: ['./eazzy-fx-negotiate.component.scss'],
})
export class EazzyFxNegotiateComponent implements OnInit {
  negotiationFormGroup: FormGroup = new FormGroup({
    sendFrom: new FormControl('', [Validators.required]),
    amount: new FormControl({}, [Validators.required]),
    schedulePayment: new FormControl('', [Validators.required]),
    transactionType: new FormControl('', [Validators.required]),
    reason: new FormControl('', []),
  });

  completionData: ConfirmationCompletionModel = {
    title: '',
    buttonText: 'Done',
    message: 'Your request has been submitted',
    subMessage: `<div>We’ll let you know the status of your request once it has been reviewed.</div>`,
    icon: 'assets/images/icons/visual-support-icons-virtual-account-submission-avatar.svg',
  };

  negotiated: boolean = false;

  constructor(
    private readonly eazzyFxTransactionTypeModalService: EazzyFxTransactionTypeModalService,
    private readonly eazzyFxRateService: EazzyFxRateService,
    private readonly router: Router
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

  negotiate(): void {
    const { amount, currency } = this.negotiationFormGroup.get('amount')?.value;
    const date: string = this.negotiationFormGroup
      .get('schedulePayment')
      ?.value.startDate.toISOString();
    const transactionType: 'sell' | 'buy' =
      this.negotiationFormGroup.get('transactionType')?.value;

    this.eazzyFxRateService
      .generate(currency, '', amount, true, transactionType, date)
      .subscribe(() => (this.negotiated = true));
  }

  confirmationDone(data: boolean) {
    this.router.navigate(['/transact/foreign-exchange/eazzy-fx/rates']);
  }
}
