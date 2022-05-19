import { LoanService } from './../../../../../core/services/loan/loan.service';
import { SharedDataService } from './../../../../../core/services/shared-data/shared-data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  fullUsername: string;
  username: string;
  initials: string;
  userData: any;
  userAccounts: any = [];
  loanAccounts: any = []

  constructor(
    private storageService: StorageService,
    private router: Router,
    private sharedDataService: SharedDataService,
    private loanService: LoanService
  ) { }

  ngOnInit(): void {

    this.userData = this.storageService.getData('user_data');
    this.fullUsername = this.userData.corporateName ? this.userData.corporateName : this.userData.firstName + ' ' + this.userData.lastName;
    this.username = this.userData.userName ? this.userData.userName : this.userData.emailAddress;
    this.initials = this.generateInitials(this.fullUsername);
    this.getUserAccounts();
  }

  generateInitials(name: string): string {
    let initials = '';

    for (let i = 0; i < name.length; i++) {
      if (name.charAt(i) === ' ') {
        continue;
      }

      if (name.charAt(i) === name.charAt(i).toUpperCase()) {
        initials += name.charAt(i);

        if (initials.length === 2) {
          break;
        }
      }
    }

    return initials;
  }

  getUserAccounts() {
    this.sharedDataService.userAccounts$.subscribe((res) => {
      this.userAccounts = res;
    });

    this.loanService.loanAccounts$.subscribe((res) => {
      this.loanAccounts = res;
    });
  }

  goToProfileDetail() {
    this.router.navigate([
      `/more/profile-detail`,
    ]);
  }

}
