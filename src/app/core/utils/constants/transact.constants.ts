import { Injectable } from '@angular/core';
import { TransactDashboardList } from '../../domain/transact-list.model';
import { TransactionTypeModel } from '../../domain/transfer.models';

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
          leftIcon: 'account_balance',
          text: 'Swift',
          subtext: 'An international bank',
          link: '/transact/swift',
        },
        {
          leftIcon: 'credit_card',
          text: 'Pay to card',
          subtext: 'Credit and prepaid cards',
          link: '/transact/pay-to-card',
        },
        {
          leftIcon: 'build_circle',
          text: 'Beneficiary management',
          subtext: 'Manage your beneficiaries',
          link: '/transact/beneficiary-management',
        },
        {
          leftIcon: 'account_balance',
          text: 'Pesalink',
          subtext: 'A local or international bank',
          link: '/transact/pesa-link',
        },
        {
          leftIcon: 'phone_iphone',
          text: 'Bulk payment',
          link: '/transact/bulk-transfer',
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
    {
      section: 'Foreign exchange',
      content: [
        {
          leftIcon: 'laptop_chromebook',
          text: 'EazzyFX',
          link: '/transact/foreign-exchange/eazzy-fx',
        }
      ]
    },
    {
      section: 'Standing orders',
      content: [
        {
          leftIcon: 'tablet_android',
          text: 'Standing orders',
          link: '/transact/standing-orders',
        },
      ],
    },
  ];
}
