import { Component, OnInit } from '@angular/core';
import { SelectAccountModel } from 'src/app/core/domain/select-account.model';
import { CurrencySelectionModal } from 'src/app/core/domain/currency-selection.model';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';
import { CurrencySelectionService } from 'src/app/core/services/currency-selection/currency-selection.service';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';

@Component({
  selector: 'app-own-equity-account',
  templateUrl: './own-equity-account.component.html',
  styleUrls: ['./own-equity-account.component.scss']
})
export class OwnEquityAccountComponent implements OnInit {
  accountsMockSendFrom: SelectAccountModel[] = [{
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

  accountsMockSendTo: SelectAccountModel[] = [{
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

  sendFrom: SelectAccountModel;
  sendTo: SelectAccountModel;
  currency: CurrencySelectionModal;

  constructor(
    private readonly selectAccountService: SelectAccountModalService,
    private readonly currencySelectionService:CurrencySelectionService,
    private readonly currencySelectionConstants:CurrencySelectionConstants,
    private readonly schedulePaymentService:SchedulePaymentService
  ) { }

  ngOnInit(): void {
    this.selectAccountService.selectedAccount.subscribe((x) => this.sendFrom = x);
    this.selectAccountService.selectedAccountSendTo.subscribe((x) => this.sendTo = x);
    this.currencySelectionService.selected.subscribe(x => this.currency = x);
  }

  openAccountSendFrom(): void {
    this.selectAccountService.open(this.accountsMockSendFrom)
  }

  openAccountSendTo(): void {
    this.selectAccountService.openSendTo(this.accountsMockSendTo)
  }

  openCurrencies(): void {
    this.currencySelectionService.open(this.currencySelectionConstants.CURRENCY_LISTINGS)
  }

  openPaymentDialog(): void {
    this.schedulePaymentService.openSchedulePayment();
  }

}
