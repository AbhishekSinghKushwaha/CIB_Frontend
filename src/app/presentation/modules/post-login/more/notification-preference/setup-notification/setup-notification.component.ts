import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission, Role } from 'src/app/core/domain/customer-onboarding.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-setup-notification',
  templateUrl: './setup-notification.component.html',
  styleUrls: ['./setup-notification.component.scss']
})
export class SetupNotificationComponent implements OnInit {

  activeRoles: any[];
  redirectTo: string;
  roles: Role[];
  memberId: any;
  isUpdating: boolean = false;

  listNotificationOptions: any = [

  ];

  constructor(
    private readonly router: Router,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activeRoles = [];
    this.memberId = this.activatedRoute.snapshot.queryParamMap.get("id");
  }

  ngOnInit(): void {
    this.listNotificationOptions = this.storageService.getData("notification-preferences");

    this.setAlreadySelectedRoles();
  }

  setAlreadySelectedRoles() {
    const roles = this.storageService.getData("selected-roles");
    if (this.activeRoles.length === 0 && roles !== null) {
      this.activeRoles = roles;
    } else {
      this.activeRoles = [];
    }
  }

  savePreferences(): void {
    this.storageService.setData("notification-preferences", this.listNotificationOptions);
    this.isUpdating = false;

  }

}
