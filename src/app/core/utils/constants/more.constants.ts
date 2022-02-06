import { Injectable } from '@angular/core';
import { TransactDashboardList } from '../../domain/transact-list.model';

@Injectable()
export class MoreConstants {
  constructor() {}

  MORE_DASHBOARD_LIST: TransactDashboardList[] = [
    {
      section: 'Send money',
      content: [
        {
          leftIcon: 'swap_horiz',
          text: 'Intercountry funds transfer',
          link: '/more/intercountry-fund-transfer',
        },
        {
          leftIcon: 'input',
          text: 'Loan repayment',
          link: '/more',
        },
        {
          leftIcon: 'credit_card',
          text: 'Swift',
          subtext: 'Credit and prepaid cards',
          link: '/more',
        },
        {
          leftIcon: 'account_balance',
          text: 'RTGS and EFT',
          subtext: 'A local or international bank',
          link: '/more',
        },
        {
          leftIcon: 'phone_iphone',
          text: 'Bulk payment',
          link: '/more',
        },
        {
          leftIcon: 'account_balance',
          text: 'Bulk salary',
          subtext: 'A local or international bank',
          link: '/more',
        },
      ],
    },
    {
      section: 'Beneficiary management',
      content: [
        {
          leftIcon: 'receipt',
          text: 'View beneficiaries',
          link: '/more',
        },
        {
          leftIcon: 'receipt',
          text: 'Add new',
          link: '/more',
        }
    ],
    },
    {
      section: 'Standing orders',
      content: [
        {
          leftIcon: 'tablet_android',
          text: 'Standing orders',
          link: '/more',
        },
      ],
    },
    {
      section: 'Manage favourites',
      content: [
        {
          leftIcon: 'tablet_android',
          text: 'Favourites',
          link: '/more',
        }
      ],
    },
  ];
}
