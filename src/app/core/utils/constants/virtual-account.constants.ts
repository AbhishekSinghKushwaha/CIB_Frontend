import { Injectable } from '@angular/core';
import { TransactDashboardList } from '../../domain/transact-list.model';

@Injectable()
export class VirtualAccountConstants {
  constructor() { }

  DASHBOARD_LIST: any[] = [
    {
      image: './assets/images/icons/visual-support-icons-link-account.svg',
      title: 'Link',
      message: 'An account, card or mobile wallet',
    },
    {
      image: './assets/images/icons/visual-support-icons-open-account.svg',
      title: 'Open an account',
      message: 'Save, transact, borrow and more',
    },
    {
      image: './assets/images/icons/visual-support-icons-open-account.svg',
      title: 'Open a virtual account',
      message: 'Save, transact, borrow and more',
    }
  ];
}
