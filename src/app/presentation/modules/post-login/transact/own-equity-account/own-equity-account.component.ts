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


@Component({
  selector: 'app-own-equity-account',
  templateUrl: './own-equity-account.component.html',
  styleUrls: ['./own-equity-account.component.scss']
})
export class OwnEquityAccountComponent implements OnInit {

  sendFrom: SelectAccountModel;
  sendTo: SelectAccountModel;
  currency: CurrencySelectionModal;
  schedulePaymentData: ScheduledPaymentModel;

  constructor(
    private readonly selectAccountService: SelectAccountModalService,
    private readonly selectAccountSendtoService:SelectAccountSendtoService,
    private readonly currencySelectionService:CurrencySelectionService,
    private readonly currencySelectionConstants:CurrencySelectionConstants,
    private readonly selectAccountConstants:SelectAccountConstants,
    private readonly schedulePaymentService:SchedulePaymentService,
    private readonly scheduledPaymentService: ScheduledPaymentService,
    private readonly supportingDocumentsUploadService:SupportingDocumentsUploadService,
  ) { }

  ngOnInit(): void {
    this.selectAccountService.selected.subscribe((x) => this.sendFrom = x);
    this.selectAccountSendtoService.selectedAccountSendTo.subscribe((x) => this.sendTo = x);
    this.currencySelectionService.selected.subscribe(x => this.currency = x);
  }

  openAccountSendFrom(): void {
    this.selectAccountService.open(this.selectAccountConstants.accountsMockSendFrom)
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

}
