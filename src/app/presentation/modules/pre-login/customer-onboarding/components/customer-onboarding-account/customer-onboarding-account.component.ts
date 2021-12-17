import { Component, OnInit } from '@angular/core';

enum AccountType {
  Personal,
  Corporate,
}

@Component({
  selector: 'app-customer-onboarding-account',
  templateUrl: './customer-onboarding-account.component.html',
  styleUrls: ['./customer-onboarding-account.component.scss'],
})
export class CustomerOnboardingAccountComponent implements OnInit {
  accountOptions: {
    initials: string;
    text: string;
    title: string;
    type: AccountType;
  }[] = [
    {
      initials: 'PA',
      text: 'For all your personal banking',
      title: 'Personal account',
      type: AccountType.Personal,
    },
    {
      initials: 'CB',
      text: 'For all your business banking',
      title: 'Corporate account',
      type: AccountType.Corporate,
    },
  ];

  selectedAccountType: AccountType;

  constructor() {}

  ngOnInit(): void {}

  accountOptionClick(accountType: AccountType): void {
    this.selectedAccountType = accountType;
  }
}
