import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-preference',
  templateUrl: './notification-preference.component.html',
  styleUrls: ['./notification-preference.component.scss']
})
export class NotificationPreferenceComponent implements OnInit {

  listMenuItem = [
    {
      leftIcon: 'settings',
      text: 'Notification preferences',
      link: '/more/notification-preference/setup-notification',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
