import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BankModel } from 'src/app/core/domain/bank.model';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { TransactionTypeModalService } from 'src/app/core/services/transaction-type-modal/transaction-type-modal.service';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import TRANSACT_TYPE from 'src/app/core/utils/constants/transaction-type.constants';

@Component({
  selector: 'app-beneficiary-management-form',
  templateUrl: './beneficiary-management-form.component.html',
  styleUrls: ['./beneficiary-management-form.component.scss']
})
export class BeneficiaryManagementFormComponent implements OnInit {
  equityForm: FormGroup;
  bank: BankModel;

  constructor(
    private readonly bankService: BankService,
    private readonly transactionTypeModalService: TransactionTypeModalService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.eventsSubscriptions();
  }

  private eventsSubscriptions(): void {
    this.bankService.selected.subscribe((response) => {
      console.log(response);
      this.bank = response;
      this.equityForm.controls.bank.setValue(response.name);
    });
    // this.favouritesModalService.selected.subscribe((response) => {
    //   this.equityForm.controls.recipient.setValue(response.name);
    //   this.sendTo = response;
    // });
    // this.currencySelectionService.selected.subscribe(response => {
    //   this.equityForm.controls.currency.setValue(response.text);
    //   this.currency = response;
    // });
    // this.scheduledPaymentService.data.subscribe(response => this.paymentDate = response)
  }

  private initForm(): void {
    this.equityForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      bank: new FormControl(null, [Validators.required]),
      accountNumber: new FormControl(null, [Validators.required]),
      transactionType: new FormControl(null, [Validators.required]),
      // recipient: new FormControl(null, [Validators.required]),
    });
  }

  submit() {

  }

  openBanks() {
    this.bankService.open(mockData.banks)
  }

  openTransactions() {
    this.transactionTypeModalService.open(TRANSACT_TYPE)
  }
}
