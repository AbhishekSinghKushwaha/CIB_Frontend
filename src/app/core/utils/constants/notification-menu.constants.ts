import { Injectable } from '@angular/core';
import { NotificationDashboardList } from '../../domain/notification-preferences-list.model';

@Injectable()
export class NotificationConstants {
  constructor() {}

  NOTIFICATION_DASHBOARD_LIST: NotificationDashboardList[] = [
    {
      section: 'Initiator',
      content: [
        {
          leftIcon: 'swap_horiz',
          text: 'Payments',
          subtext: '0810174008113 • Savings',
        },
        {
          leftIcon: 'input',
          text: 'Transfers',
          subtext: '0810174008 • Current account',
        }
      ],
    },
    {
      section: 'Approver',
      content: [
        {
          leftIcon: 'add_shopping_cart',
          text: 'Approve/reject',
          subtext: 'Notification enabled'
        },
        {
          leftIcon: 'add_shopping_cart',
          text: 'Payments',
          subtext: 'For Equity online'
        },
        {
            leftIcon: 'add_shopping_cart',
            text: 'Push notification',
            subtext: 'For Equity online'
        },
        {
            leftIcon: 'add_shopping_cart',
            text: 'Push notification',
            subtext: 'For Equity online'
        },
      ],
    },
    {
      section: 'Super admin',
      content: [
        {
            leftIcon: 'add_shopping_cart',
            text: 'Approve/reject',
            subtext: 'Notification enabled'
          },
          {
            leftIcon: 'add_shopping_cart',
            text: 'Payments',
            subtext: 'For Equity online'
          },
          {
              leftIcon: 'add_shopping_cart',
              text: 'Push notification',
              subtext: 'For Equity online'
          },
          {
              leftIcon: 'add_shopping_cart',
              text: 'Push notification',
              subtext: 'For Equity online'
          },
          {
            leftIcon: 'add_shopping_cart',
            text: 'Push notification',
            subtext: 'For Equity online'
        },
        {
            leftIcon: 'add_shopping_cart',
            text: 'Push notification',
            subtext: 'For Equity online'
        },
      ],
    },
  ];
}
