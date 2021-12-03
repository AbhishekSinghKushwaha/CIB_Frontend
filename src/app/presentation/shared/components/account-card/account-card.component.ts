import { Subject } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent implements OnInit {
  @Input() acc: any;
  @Output() delinkAccount = new Subject<any>();
  @Output() transact = new Subject<any>();
  @Output() toggleBalance = new Subject<any>();
  cards: any = [
    {
      cardName: 'Ken Ken',
      cardNumber: '12354558959526654444',
      imageName: 'visual-support-master-card@3x.png',
    },
    {
      cardName: 'Ken O.',
      cardNumber: '12354558959526654444',
      imageName: 'visual-support-visa@3x.png',
    },
  ];
  constructor(private router: Router) { }

  ngOnInit(): void { }

  openAccDetails(value: string): void {
    this.router.navigateByUrl('/home/account/accountDetails/' + value);
  }
  onToggleBalanceClicked(): void {
    const currentDisplay = this.acc.balanceHidden;
    const accountToUpdate = {
      accountNumber: this.acc.accountNumber,
      balanceHidden: currentDisplay,
    };
    console.log('Account to update: ', accountToUpdate);
    if (currentDisplay === true) {
      this.acc.balanceHidden = false;
      accountToUpdate.balanceHidden = false;
    } else {
      this.acc.balanceHidden = true;
      accountToUpdate.balanceHidden = true;
    }
    this.toggleBalance.next(accountToUpdate);
  }

  onTransactClicked(): void {
    this.transact.next(this.acc.accountNumber);
    this.router.navigate(['/transfer']);
  }

  onUnlinkClicked(): void {
    this.delinkAccount.next(this.acc.accountNumber);
  }
}
