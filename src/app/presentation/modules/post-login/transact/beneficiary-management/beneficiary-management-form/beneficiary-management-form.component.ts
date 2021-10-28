import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-beneficiary-management-form',
  templateUrl: './beneficiary-management-form.component.html',
  styleUrls: ['./beneficiary-management-form.component.scss']
})
export class BeneficiaryManagementFormComponent implements OnInit {
  equityForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
    this.eventsSubscriptions();
  }

  private eventsSubscriptions(): void {
    // this.selectAccountService.selected.subscribe((response) => {
    //   this.equityForm.controls.fromAccount.setValue(response.name);
    //   this.sendFrom = response;
    // });
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

  }

}
