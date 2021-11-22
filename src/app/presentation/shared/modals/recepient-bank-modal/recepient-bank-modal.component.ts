import { Component, Input, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BankSelectionModel } from 'src/app/core/domain/bank-selection.model';
import { BankSelectionService } from 'src/app/core/services/bank-selection/bank-selection.service';
import { RecepientBankService } from 'src/app/core/services/recepient-bank/recepient-bank.service';
import { recipientBankDetailsModel } from 'src/app/core/domain/recepient-bank-details.model';

@Component({
  selector: 'app-recepient-bank-modal',
  templateUrl: './recepient-bank-modal.component.html',
  styleUrls: ['./recepient-bank-modal.component.scss']
})
export class RecepientBankModalComponent implements OnInit {

  equityForm: FormGroup;
  bank: BankSelectionModel;
  data: recipientBankDetailsModel;

  mockBank: BankSelectionModel[] = [{
    name: 'Barclays Bank Kenya'
  }, {
    name: 'Commercial Bank of Africa'
  }, {
    name: 'Co-operative Bank'
  }, {
    name: 'Barclays Bank of Kenya'
  }, {
    name: 'KCB Bank'
  }];

  constructor(readonly dialogRef: MatDialogRef<RecepientBankModalComponent>,
    private readonly bankSelectionService: BankSelectionService,
    private readonly recepientBankService: RecepientBankService
  ) {

    this.data = recepientBankService.default;
    this.eventsSubscriptions();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.equityForm = new FormGroup({
      bank: new FormControl(this.data?.bank, [Validators.required]),
      account: new FormControl(this.data?.account, [Validators.required]),
      accountno: new FormControl(this.data?.accountno, [Validators.required]),
    });
  }

  private eventsSubscriptions(): void {
    this.bankSelectionService.selected.subscribe(response => this.equityForm.controls.bank.setValue(response.name));
  }

  close(): void {
    this.dialogRef.close(true);
  }

  openBank(): void {
    this.bankSelectionService.open(this.mockBank);
  }

  submit() {
    this.recepientBankService.set(this.equityForm.value);
    this.recepientBankService.close();
  }
}
