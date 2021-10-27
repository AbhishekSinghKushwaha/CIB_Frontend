import { Injectable } from '@angular/core';
import { TransactDashboardList } from '../../domain/transact-list.model';

@Injectable()
export class TransactConstants {
  constructor() {}

  TRANSACT_DASHBOARD_LIST: TransactDashboardList[] = [
    {
      section: 'Send money',
      content: [
        {
          leftIcon: 'swap_horiz',
          text: 'Own Equity account',
          link: '/transact/own-equity-account/',
        },
        {
          leftIcon: 'input',
          text: 'Another equity account',
          link: '/transact/other-equity-account',
        },
        {
          leftIcon: 'phone_iphone',
          text: 'Mobile money',
          link: '/transact/mobile-money',
        },
        {
          leftIcon: 'account_balance',
          text: 'Another bank',
          subtext: 'A local or international bank',
          link: '/transact/other-banks',
        },
        {
          leftIcon: 'credit_card',
          text: 'Pay to card',
          subtext: 'Credit and prepaid cards',
          link: '/transact/pay-to-card',
        },
        {
          leftIcon: 'account_balance',
          text: 'Pesalink',
          subtext: 'A local or international bank',
          link: '/transact/pesa-link',
        },
      ],
    },
    {
      section: 'Pay with Equity',
      content: [
        {
          leftIcon: 'receipt',
          text: 'Pay a bill',
          link: '/transact/pay-bills',
        },
        {
          leftIcon: 'add_shopping_cart',
          text: 'Buy goods',
          link: '/transact/buy-goods',
        },
        { leftIcon: 'add_shopping_cart', text: 'Pay to an M-PESA till' },
      ],
    },
    {
      section: 'Buy airtime',
      content: [
        {
          leftIcon: 'tablet_android',
          text: 'Airtime',
          link: '/transact/buy-airtime',
        },
      ],
    },
    {
      section: 'Withdraw money',
      content: [
        {
          leftIcon: 'laptop_chromebook',
          text: 'ATM',
          link: '/transact/withdraw/atm-withdrawal',
        },
        {
          leftIcon: 'support_agent',
          text: 'Agent',
          link: '/transact/withdraw/agent-withdrawal',
        },
      ],
    },
  ];
}
