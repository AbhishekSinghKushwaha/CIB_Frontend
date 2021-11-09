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
import { Router } from '@angular/router';

@Component({
  selector: 'app-own-equity-account',
  templateUrl: './own-equity-account.component.html',
  styleUrls: ['./own-equity-account.component.scss'],
})
export class OwnEquityAccountComponent
  extends BaseTransactComponent
  implements OnInit
{
  schedulePaymentData: ScheduledPaymentModel;
  ownEquityAccountTransferForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;
  loading: boolean = false;

  constructor(
    private readonly scheduledPaymentService: ScheduledPaymentService,
    private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly fb: FormBuilder,
    accountService: AccountsService,
    private ownEquityAccountService: OwnAccountService,
    public dialog: MatDialog,
    private readonly router: Router
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

  // Get Transfer charges, then confirm payment.
  getTransferCharges() {
    this.loading = true;
    const payload = {
      amount: this.getForm.amount.value.amount,
      currency: this.getForm.amount.value.currency,
      destinationAccount: this.getForm.sendTo.value.accountNumber,
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: 1 // For Own Equity Account
    }
    this.ownEquityAccountService.getTransferCharges(payload).subscribe(res => {
      if (res.status) {
        this.loading = false;
        this.confirmPayment(res.data);
      } else {
        this.loading = false;
        // TODO:: Notify error
      }
    })
  }

  // Confirm Payment and return the confirmation boolean before initiating payment. 
  confirmPayment(transferFee: string) {
    if (this.ownEquityAccountTransferForm.valid) {
      const paymentData = {
        from: this.getForm.sendFrom.value,
        to: this.getForm.sendTo.value,
        amount: this.getForm.amount.value,
        transactionType: 'Send to your own Equity account',
        paymentReason: this.getForm.reason.value,
        fxReferenceId: this.getForm.fxReferenceId.value,
        schedulePayment: {},
        transferFee
      };
      const dialogRef = this.dialog.open(ConfirmPaymentComponent, {
        data: paymentData,
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((res) => {
        if (res.confirmed) {
          this.sendMoney()
        }
      });
    } else {
      this.loading = false;
    }
  }

  // Initiate fund transfer to own equity account
  sendMoney() {
    this.loading = true;
    const payload = {
      amount: this.getForm.amount.value.amount,
      beneficiaryAccount:this.getForm.sendTo.value.accountNumber,
      beneficiaryBank: "",
      beneficiaryBankCode: "",
      beneficiaryCurrency: this.getForm.sendTo.value.currency,
      beneficiaryName: this.getForm.sendTo.value.accountName,
      currency: this.getForm.amount.value.currency,
      fxReferenceId: this.getForm.fxReferenceId.value,
      paymentReason: this.getForm.reason.value,
      schedulePayment: {},
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: 1 // Own Equity Account
    }
    if (this.ownEquityAccountTransferForm.valid) {
      this.ownEquityAccountService
        .sendToOwnEquityAccount(payload)
        .subscribe((res) => {
          if (res.status) {
            this.loading = false;
            this.router.navigate(['/transact/other-equity-account/submit-transfer']);
          } else {
            this.loading = false;
            alert(res.message);
            // TODO:: Notify Error
          }
        });
    }
  }
}
