import { Component, OnInit } from '@angular/core';

enum AccountType {
  Personal,
  Corporate,
}

@Component({
  selector: 'app-account-type-options',
  templateUrl: './account-type-options.component.html',
  styleUrls: ['./account-type-options.component.scss'],
})
export class AccountTypeOptionsComponent implements OnInit {
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
