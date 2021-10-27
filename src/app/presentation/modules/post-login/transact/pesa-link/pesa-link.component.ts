import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrencySelectionModal } from 'src/app/core/domain/currency-selection.model';
import { FavouriteBeneficiaryModel } from 'src/app/core/domain/favourites-beneficiary.model';
import { ScheduledPaymentModel } from 'src/app/core/domain/scheduled-payment.model';
import { SelectAccountModel } from 'src/app/core/domain/select-account.model';
import { CurrencySelectionService } from 'src/app/core/services/currency-selection/currency-selection.service';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
import { ScheduledPaymentService } from 'src/app/core/services/scheduled-payment/scheduled-payment.service';
import { PesaLinkSendToService } from 'src/app/core/services/pesa-link-send-to/pesa-link-send-to.service';
import { FavouritesModalService } from 'src/app/core/services/favourites-modal/favourites-modal.service';
import { phoneLinkedModel } from 'src/app/core/domain/phone-linked.modal';
import { PhoneLinkedService } from 'src/app/core/services/phone-linked/phone-linked.service';
import { recipientBankDetailsModel } from 'src/app/core/domain/recepient-bank-details.model';
import { RecepientBankService } from 'src/app/core/services/recepient-bank/recepient-bank.service';
import { SupportingDocumentsUploadService } from "src/app/core/services/supporting-documents-upload/supporting-documents-upload.service";


@Component({
  selector: 'app-pesa-link',
  templateUrl: './pesa-link.component.html',
  styleUrls: ['./pesa-link.component.scss']
})
export class PesaLinkComponent implements OnInit {

  accountsMock: SelectAccountModel[] = [{
    name: 'Loot',
    balance: 999999999.99,
    currency: 'KES',
    type: 'Savings'
  }, {
    name: '0700000000',
    balance: 30000,
    currency: 'KES',
    type: 'Mobile account'
  }, {
    name: '073019380132',
    balance: 4430000,
    currency: 'KES',
    type: 'Current'
  }];

  favouritesMock: FavouriteBeneficiaryModel[] = [{
    name: 'June Lowela',
    phoneNumber: '+254 700 111 111',
    channel: 'Safaricom',
    country: 'Kenya'
  }, {
    name: 'Kevin Libega',
    phoneNumber: '+256 700 019 019',
    channel: 'MTN',
    country: 'Uganda'
  }];

  sendFrom: SelectAccountModel;
  sendTo: FavouriteBeneficiaryModel;
  currency: CurrencySelectionModal;
  equityForm: FormGroup;
  paymentDate: ScheduledPaymentModel;
  schedulePaymentData: ScheduledPaymentModel;
  phoneLinked: phoneLinkedModel;
  recepientBankDetails: recipientBankDetailsModel

  constructor(
    private readonly selectAccountService: SelectAccountModalService,
    private readonly currencySelectionService: CurrencySelectionService,
    private readonly currencySelectionConstants: CurrencySelectionConstants,
    private readonly scheduledPaymentService: ScheduledPaymentService,
    private readonly pesaLinkSendToService: PesaLinkSendToService,
    private readonly favouritesModalService: FavouritesModalService,
    private readonly phoneLinkedService: PhoneLinkedService,
    private readonly recepientBankService: RecepientBankService,
    private readonly supportingDocumentsUploadService:SupportingDocumentsUploadService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.eventsSubscriptions();
  }

  private eventsSubscriptions(): void {
    this.selectAccountService.selected.subscribe((response) => {
      this.equityForm.controls.fromAccount.setValue(response.name);
      this.sendFrom = response;
    });
    this.favouritesModalService.selected.subscribe((response) => {
      this.equityForm.controls.recipient.setValue(response.name);
      this.sendTo = response;
    });
    this.currencySelectionService.selected.subscribe(response => {
      this.equityForm.controls.currency.setValue(response.text);
      this.currency = response;
      });
    this.scheduledPaymentService.data.subscribe(response => this.paymentDate = response);
    this.phoneLinkedService.data.subscribe((response) => {
      this.equityForm.controls.recipient.setValue(response.phone);
      this.phoneLinked = response;
    });
    this.recepientBankService.data.subscribe((response) => {
      this.equityForm.controls.recipient.setValue(response.accountno);
      this.recepientBankDetails = response;
    });
  }

  private initForm(): void {
    this.equityForm = new FormGroup({
      fromAccount: new FormControl(null, [Validators.required]),
      recipient: new FormControl(null, [Validators.required]),
      currency: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
    });
  }

  openAccounts(): void {
    this.selectAccountService.open(this.accountsMock)
  }

  openFavourites(): void {
    this.pesaLinkSendToService.open(this.favouritesMock)
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

  submit() {

  }

}
