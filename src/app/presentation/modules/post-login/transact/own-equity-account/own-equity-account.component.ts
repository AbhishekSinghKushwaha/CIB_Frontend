import { Component, OnInit } from '@angular/core';
import { SelectAccountModel } from 'src/app/core/domain/select-account.model';
import { CurrencySelectionModal } from 'src/app/core/domain/currency-selection.model';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';
import { SelectAccountSendtoService } from 'src/app/core/services/select-account-sendto/select-account-sendto.service';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';
import { CurrencySelectionService } from 'src/app/core/services/currency-selection/currency-selection.service';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
import { SupportingDocumentsUploadService } from "src/app/core/services/supporting-documents-upload/supporting-documents-upload.service";
import { SelectAccountConstants } from 'src/app/data/repository/select-account-mock-repository/select-account.constants';
import { ScheduledPaymentModel } from 'src/app/core/domain/scheduled-payment.model';
import { ScheduledPaymentService } from './../../../../../core/services/scheduled-payment/scheduled-payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseTransactComponent } from '../base-transact.component';
import { AccountsService } from 'src/app/core/services/accounts/accounts.service';
import { accountLimitValidator } from 'src/app/core/utils/validators/limits.validators';
import { UniversalValidators } from 'ngx-validators';

@Component({
  selector: 'app-own-equity-account',
  templateUrl: './own-equity-account.component.html',
  styleUrls: ['./own-equity-account.component.scss']
})
export class OwnEquityAccountComponent extends BaseTransactComponent implements OnInit {

  // sendFrom: SelectAccountModel;
  sendTo: SelectAccountModel;
  currency: CurrencySelectionModal;
  schedulePaymentData: ScheduledPaymentModel;

  ownEquityAccountTransferForm: FormGroup;

  constructor(
    private readonly selectAccountService: SelectAccountModalService,
    private readonly selectAccountSendtoService:SelectAccountSendtoService,
    private readonly currencySelectionService:CurrencySelectionService,
    private readonly currencySelectionConstants:CurrencySelectionConstants,
    private readonly selectAccountConstants:SelectAccountConstants,
    private readonly schedulePaymentService:SchedulePaymentService,
    private readonly scheduledPaymentService: ScheduledPaymentService,
    private readonly supportingDocumentsUploadService:SupportingDocumentsUploadService,
    private readonly fb: FormBuilder,
    accountService: AccountsService
  ) {
    super(accountService)
   }

  ngOnInit(): void {
    this.initForm()
    this.getUserAccounts();
  }

  initForm(): void {
    this.ownEquityAccountTransferForm = this.fb.group({
      sendFrom: ['', [Validators.required]],
      sendTo: ['', ],
      amount: [{}, [Validators.required, accountLimitValidator]],
      reason: [''],
      fxReferenceId: ['', [Validators.required]]
    })
  }

  openAccountSendTo(): void {
    this.selectAccountSendtoService.open(this.selectAccountConstants.accountsMockSendTo)
  }

  openCurrencies(): void {
    this.currencySelectionService.open(this.currencySelectionConstants.CURRENCY_LISTINGS)
  }

  openPaymentDialog(): void {
    this.scheduledPaymentService.open(this.schedulePaymentData);
  }

  openSupportingDocuments(): void {
    this.supportingDocumentsUploadService.open();
  }

  sendMoney() {
    console.log(this.ownEquityAccountTransferForm.getRawValue())
    console.log(this.ownEquityAccountTransferForm.controls.amount.errors)
  }

}
