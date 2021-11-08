import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectAccountModel } from 'src/app/core/domain/select-account.model';
import { CurrencySelectionModal } from 'src/app/core/domain/currency-selection.model';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';
import { SelectAccountSendtoService } from 'src/app/core/services/select-account-sendto/select-account-sendto.service';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';
import { CurrencySelectionService } from 'src/app/core/services/currency-selection/currency-selection.service';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
import { SupportingDocumentsUploadService } from 'src/app/core/services/supporting-documents-upload/supporting-documents-upload.service';
import { SelectAccountConstants } from 'src/app/data/repository/select-account-mock-repository/select-account.constants';
import { ScheduledPaymentModel } from 'src/app/core/domain/scheduled-payment.model';
import { ScheduledPaymentService } from './../../../../../core/services/scheduled-payment/scheduled-payment.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseTransactComponent } from '../base-transact.component';
import { AccountsService } from 'src/app/core/services/accounts/accounts.service';
import { accountLimitValidator } from 'src/app/core/utils/validators/limits.validators';
import { UniversalValidators } from 'ngx-validators';
import { OwnAccountService } from 'src/app/core/services/transfers/own-account/own-account.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPaymentComponent } from 'src/app/presentation/shared/modals/confirm-payment/confirm-payment.component';

@Component({
  selector: 'app-own-equity-account',
  templateUrl: './own-equity-account.component.html',
  styleUrls: ['./own-equity-account.component.scss'],
})
export class OwnEquityAccountComponent
  extends BaseTransactComponent
  implements OnInit
{
  // sendFrom: SelectAccountModel;
  sendTo: SelectAccountModel;
  currency: CurrencySelectionModal;
  schedulePaymentData: ScheduledPaymentModel;

  ownEquityAccountTransferForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;

  constructor(
    private readonly selectAccountService: SelectAccountModalService,
    private readonly selectAccountSendtoService: SelectAccountSendtoService,
    private readonly currencySelectionService: CurrencySelectionService,
    private readonly currencySelectionConstants: CurrencySelectionConstants,
    private readonly selectAccountConstants: SelectAccountConstants,
    private readonly schedulePaymentService: SchedulePaymentService,
    private readonly scheduledPaymentService: ScheduledPaymentService,
    private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly fb: FormBuilder,
    accountService: AccountsService,
    private ownEquityAccountService: OwnAccountService,
    public dialog: MatDialog
  ) {
    super(accountService);
  }

  get getForm() {
    return this.ownEquityAccountTransferForm.controls;
  }
  ngOnInit(): void {
    this.initForm();
    this.getUserAccounts();
  }

  initForm(): void {
    this.ownEquityAccountTransferForm = this.fb.group({
      sendFrom: ['', [Validators.required]],
      sendTo: [''],
      amount: [{}, [Validators.required, accountLimitValidator]],
      reason: [''],
      fxReferenceId: ['', [Validators.required]],
    });
  }

  openPaymentDialog(): void {
    this.scheduledPaymentService.open(this.schedulePaymentData);
  }

  openSupportingDocuments(): void {
    this.supportingDocumentsUploadService.open();
  }

  // Confirm Payment and return the confirmation boolean
  confirmPayment() {
    if (this.ownEquityAccountTransferForm.valid) {
      const payload = {
        sourceAccount: this.getForm.sendFrom.value.accountNumber,
        currency: this.getForm.amount.value.currency,
        amount: this.getForm.amount.value.amount,
        beneficiaryName: this.getForm.sendTo.value.accountName,
        beneficiaryAccount: this.getForm.sendTo.value.accountNumber,
        beneficiaryBank: '',
        beneficiaryBankCode: '',
        beneficiaryCurrency: this.getForm.sendTo.value.currency,
        transferType: 1,
        paymentReason: this.getForm.reason.value,
        fxReferenceId: this.getForm.fxReferenceId.value,
        schedulePayment: {},
      };
      const paymentData = {
        transactionType: 'Send to your own Equity account',
        amount: this.getForm.amount.value,
      }
      const dialogRef = this.dialog.open(ConfirmPaymentComponent, {
        data: payload,
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((res) => {
        console.log(res);
      });
    }
  }

  sendMoney(payload: any) {
    if (this.ownEquityAccountTransferForm.valid) {
      this.ownEquityAccountService
        .sendToOwnEquityAccount(payload)
        .subscribe((res) => {
          if (res.status) {
            console.log(res);
          } else {
            console.log(res);
          }
        });
    }
  }
}
