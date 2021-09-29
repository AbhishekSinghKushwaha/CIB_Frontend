import { Injectable } from '@angular/core';
import { dashboardListModel } from '../../domain/dashboard-list.model';

@Injectable()
export class DashboardConstants {

  constructor() { }

  DASHBOARD_LISTINGS: dashboardListModel[] = [{
    section: 'Send money',
    content: [
      { leftIcon: 'swap_horiz', text: 'Own Equity account' },
      { leftIcon: 'input', text: 'Another equity account' },
      { leftIcon: 'phone_iphone', text: 'Mobile money' },
      { leftIcon: 'account_balance', text: 'Another bank', subtext: 'A local or international bank' },
      { leftIcon: 'credit_card', text: 'Pay to card', subtext: 'Credit and prepaid cards' },
    ]
  }, {
    section: 'Pay with Equity',
    content: [
      { leftIcon: 'receipt', text: 'Pay a bill' },
      { leftIcon: 'add_shopping_cart', text: 'Buy goods' },
      { leftIcon: 'add_shopping_cart', text: 'Pay to an M-PESA till' },
    ]
  }, {
    section: 'Buy airtime',
    content: [
      { leftIcon: 'tablet_android', text: 'Airtime' },
    ]
  }, {
    section: 'Withdraw money',
    content: [
      { leftIcon: 'laptop_chromebook', text: 'ATM' },
      { leftIcon: 'support_agent', text: 'Agent' },
    ]
  }];
}
