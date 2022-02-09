import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BankModel } from 'src/app/core/domain/bank.model';
import { BeneficiaryModel } from 'src/app/core/domain/beneficiary.model';
import { BankService } from 'src/app/core/services/modal-services/bank.service';
import { BeneficiaryManagementService } from 'src/app/core/services/beneficiary-management/beneficiary-management.service';
import { TransactionTypeModalService } from 'src/app/core/services/transaction-type-modal/transaction-type-modal.service';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { SharedUtils } from 'src/app/core/utils/shared.util';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';

@Component({
  selector: 'app-beneficiary-management-form',
  templateUrl: './beneficiary-management-form.component.html',
  styleUrls: ['./beneficiary-management-form.component.scss'],
})
export class BeneficiaryManagementFormComponent implements OnInit {
  equityForm: FormGroup;
  visibility = true;
  bank: BankModel;
  transactionType: any;
  editMode: boolean;
  id: number;
  editData: BeneficiaryModel;
  subscriptions: Subscription[] = [];
  @Input() modalMode = false;
  private _modalData: BeneficiaryModel;
  @Input()
  set modalData(value: BeneficiaryModel) {
    this._modalData = value;
    this.editData = value;
    this.initForm();
  }
  get modalData(): BeneficiaryModel {
    return this._modalData;
  }
  @Output() formSubmitted = new Subject<BeneficiaryModel>();

  constructor(
    private readonly bankService: BankService,
    private readonly transactionTypeModalService: TransactionTypeModalService,
    private readonly beneficiaryManagementService: BeneficiaryManagementService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

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
    this.subscriptions.push(
      this.bankService.selected.subscribe((response) => {
        this.bank = response;
        this.equityForm.controls.bank.setValue(response.bankName);
      })
    );
    this.subscriptions.push(
      this.transactionTypeModalService.selected.subscribe((response) => {
        this.equityForm.controls.transactionType.setValue(response.name);
        this.transactionType = response;
      })
    );
  }

  private initForm(): void {
    this.equityForm = new FormGroup({
      name: new FormControl(this.editData?.name, [Validators.required]),
      bank: new FormControl(this.editData?.bank, [Validators.required]),
      accountNumber: new FormControl(this.editData?.accountNumber, [
        Validators.required,
      ]),
      transactionType: new FormControl(this.editData?.transactionType, [
        Validators.required,
      ]),
    });
  }

  submit() {
    console.log({ editMode: this.editMode, modalMode: this.modalMode });
    if (!this.editMode) {
      if (this.modalMode) {
        this.formSubmitted.next(this.equityForm.value);
      } else {
        this.beneficiaryManagementService.submitForm(this.equityForm.value);
        this.router.navigate(['/transact/beneficiary-management']);
      }
    } else {
      if (this.modalMode) {
        this.formSubmitted.next({ ...this.equityForm.value, id: this.id });
      } else {
        this.beneficiaryManagementService.updateForm(
          this.equityForm.value,
          this.id
        );
        this.router.navigate(['/transact/beneficiary-management']);
      }
    }
  }

  openBanks() {
    const modal = this.bankService.open(mockData.banks);
    if (this.modalMode) {
      this.visibility = false;
      modal.afterClosed().subscribe(() => {
        this.visibility = true;
      });
    }
  }

  openTransactions() {
    const modal = this.transactionTypeModalService.open(
      TransactionTypeConstants.TRANSACT_TYPE
    );
    if (this.modalMode) {
      this.visibility = false;
      modal.afterClosed().subscribe(() => {
        this.visibility = true;
      });
    }
  }

  ngOnDestroy(): void {
    this.equityForm.reset();
    SharedUtils.unSubscribe(this.subscriptions);
  }
}
