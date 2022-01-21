import { Injectable } from '@angular/core';
import { NotificationDashboardList } from '../../domain/notification-preferences-list.model';

@Injectable()
export class NotificationConstants {
  constructor() { }

  NOTIFICATION_DASHBOARD_LIST: NotificationDashboardList[] = [
    {
      section: 'Please select payment options',
      content: [
        {
          leftIcon: 'swap_horiz',
          text: 'Internal fund transfer',
          subtext: '0810174008113 • Savings',
        },
        {
          leftIcon: 'input',
          text: 'Intra bank fund transfer',
          subtext: '0810174008 • Current account',
        },
        {
          leftIcon: 'add_shopping_cart',
          text: 'ETF/RTGS transfer',
          subtext: 'Notification enabled'
        },
        {
          leftIcon: 'add_shopping_cart',
          text: 'Tax payment',
          subtext: 'For Equity online'
        },
        {
          leftIcon: 'add_shopping_cart',
          text: 'International funds transfer',
          subtext: 'For Equity online'
        },
        {
          leftIcon: 'add_shopping_cart',
          text: 'Bulk payment',
          subtext: 'For Equity online'
        },
        {
          leftIcon: 'add_shopping_cart',
          text: 'Salary payment',
          subtext: 'For Equity online'
        },
        {
          leftIcon: 'add_shopping_cart',
          text: 'Utility payment',
          subtext: 'For Equity online'
        },
        {
          leftIcon: 'add_shopping_cart',
          text: 'Inter country transfers',
          subtext: 'For Equity online'
        },
        {
          leftIcon: 'add_shopping_cart',
          text: 'Card payment',
          subtext: 'For Equity online'
        },
        {
          leftIcon: 'add_shopping_cart',
          text: 'Pesalink transfer',
          subtext: 'For Equity online'
        },
        {
          leftIcon: 'add_shopping_cart',
          text: 'Standing instruction',
          subtext: 'For Equity online'
        }
      ],
    }
  ];
}
