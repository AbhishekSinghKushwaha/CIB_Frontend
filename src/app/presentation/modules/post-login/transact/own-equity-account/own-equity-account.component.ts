import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnequityModalService } from "src/app/core/services/ownequity-modal/ownequity-modal.service";
import AccountSelectionUtils from '../../../../../core/utils/account-selection.utils';

@Component({
  selector: 'app-own-equity-account',
  templateUrl: './own-equity-account.component.html',
  styleUrls: ['./own-equity-account.component.scss']
})
export class OwnEquityAccountComponent implements OnInit {

  constructor(
    private readonly ownequityModalService: OwnequityModalService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  openCurrencyDialog(): void {
    this.ownequityModalService.openCurrency();
  }

  openPaymentDialog(): void {
    this.ownequityModalService.openSchedulePayment();
  }

  openAccountSendFrom(): void {
    const message = AccountSelectionUtils.getAccountTitleModalParam({
      title: 'Send from',
      content: [{
        radiotext: 'Loot',
        text: 'Account balance 999,999,999.99 KES',
        subtext: '0810174008113 • Savings'
      }, {
        radiotext: '0700000000',
        text: 'Account balance 30,000.00 KES',
        subtext: '0700000000 • Mobile account'
      }, {
        radiotext: '073019380132',
        text: 'Account balance 4,430,000.00 KES',
        subtext: '073019380132 • Current'
      }]
    })
    this.ownequityModalService.openAccountSelection(message);
  }

  openAccountSendTo(): void {
    const message = AccountSelectionUtils.getAccountTitleModalParam({
      title: 'Send to',
      content: [{
        radiotext: '0700000000',
        text: 'Account balance 30,000.00 KES',
        subtext: '0700000000 • Mobile account'
      }, {
        radiotext: '073019380132',
        text: 'Account balance 4,430,000.00 KES',
        subtext: '073019380132 • Current'
      }]
    })
    this.ownequityModalService.openAccountSelection(message);
  }

}
