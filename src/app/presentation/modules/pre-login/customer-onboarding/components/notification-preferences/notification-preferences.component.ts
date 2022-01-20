import { Component, OnInit } from '@angular/core';
import { NotificationConstants } from 'src/app/core/utils/constants/notification-menu.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-preferences',
  templateUrl: './notification-preferences.component.html',
  styleUrls: ['./notification-preferences.component.scss'],
})
export class NotificationPreferencesComponent implements OnInit {

  constructor(
    public readonly notificationDashboardList: NotificationConstants,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.router.navigate(['/auth/customer-onboarding/add-members']);
  }

}
