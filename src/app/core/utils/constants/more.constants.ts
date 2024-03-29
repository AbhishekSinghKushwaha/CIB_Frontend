import { Injectable } from '@angular/core';
import { TransactDashboardList } from '../../domain/transact-list.model';

@Injectable()
export class MoreConstants {
  constructor() { }

  MORE_DASHBOARD_LIST: TransactDashboardList[] = [
    {
      section: '',
      content: [
        {
          leftIcon: 'perm_identity',
          text: 'Security Settings',
          subtext: 'Manage your password and security questions',
          link: '/more/security',
        },
        {
          leftIcon: 'collections',
          text: 'Change your dashboard view',
          subtext: 'View items as a list or thumbnails',
          link: '/more',
        },
        {
          leftIcon: 'lock',
          text: 'Set up verification preferences',
          subtext: 'Let us know how you’d like to receive your verification codes',
          link: '/more/otp-access',
        },
        {
          leftIcon: 'notifications',
          text: 'Notifications',
          subtext: 'View and manage your notifications',
          link: '/more/notification-preference',
        },
        {
          leftIcon: 'person_outline',
          text: 'Manage your details',
          subtext: 'Edit your personal details',
          link: 'more/profile-detail',
        },
      ],
    },
  ];
}
