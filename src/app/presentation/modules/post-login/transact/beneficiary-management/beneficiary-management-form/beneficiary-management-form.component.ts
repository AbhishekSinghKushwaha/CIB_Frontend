import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BankModel } from 'src/app/core/domain/bank.model';
import { BeneficiaryModel } from 'src/app/core/domain/beneficiary.model';
import { TransactionTypeModel } from 'src/app/core/domain/transaction-type.model';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { BeneficiaryManagementService } from 'src/app/core/services/beneficiary-management/beneficiary-management.service';
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
  transactionType: TransactionTypeModel;
  editMode: boolean;
  id: number;
  editData: BeneficiaryModel;

  constructor(
    private readonly bankService: BankService,
    private readonly transactionTypeModalService: TransactionTypeModalService,
    private readonly beneficiaryManagementService: BeneficiaryManagementService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.formMode();
    this.getEditData();
    this.initForm();
    this.eventsSubscriptions();
  }

  formMode(): void {
    this.id = +this.route.snapshot.params['id'];
    this.editMode = !!this.id;
  }

  getEditData() {
    this.editData = this.beneficiaryManagementService.beneficiaryEdit;
  }

  private eventsSubscriptions(): void {
    this.bankService.selected.subscribe((response) => {
      this.bank = response;
      this.equityForm.controls.bank.setValue(response.name);
    });
    this.transactionTypeModalService.selected.subscribe((response) => {
      this.equityForm.controls.transactionType.setValue(response.name);
      this.transactionType = response;
    });
  }

  private initForm(): void {
    this.equityForm = new FormGroup({
      name: new FormControl(this.editData?.name, [Validators.required]),
      bank: new FormControl(this.editData?.bank, [Validators.required]),
      accountNumber: new FormControl(this.editData?.accountNumber, [Validators.required]),
      transactionType: new FormControl(this.editData?.transactionType, [Validators.required]),
    });
  }

  submit() {
    if (!this.editMode) {
      this.beneficiaryManagementService.submitForm(this.equityForm.value);
      this.equityForm.reset();
      this.router.navigate(['/transact/beneficiary-management']);
    } else {
      console.log('Edit mode');
      this.beneficiaryManagementService.updateForm(this.equityForm.value, this.id);
    }
  }

  openBanks() {
    this.bankService.open(mockData.banks)
  }

  openTransactions() {
    this.transactionTypeModalService.open(TRANSACT_TYPE)
  }
}
