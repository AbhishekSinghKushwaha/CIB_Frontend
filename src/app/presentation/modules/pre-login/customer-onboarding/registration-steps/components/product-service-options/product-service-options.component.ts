import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationConstants } from 'src/app/core/utils/constants/notification-menu.constants';

@Component({
  selector: 'app-product-service-options',
  templateUrl: './product-service-options.component.html',
  styleUrls: ['./product-service-options.component.scss'],
})
export class ProductServiceOptionsComponent implements OnInit {
  constructor(
    public readonly notificationDashboardList: NotificationConstants,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  submit() {
    this.router.navigate([
      '/auth/customer-onboarding/register/add-product-service',
    ]);
  }
}
