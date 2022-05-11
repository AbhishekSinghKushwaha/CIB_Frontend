import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/core/domain/account.model';
import { CardModel } from 'src/app/core/domain/card.model';
import { TransactMenuItem } from 'src/app/core/domain/transact-menu-item.model';
import { LoggedinUserModel } from 'src/app/core/domain/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoanService } from 'src/app/core/services/loan/loan.service';
import SharedUtils from 'src/app/core/utils/shared.util';
import SharedUtil from 'src/app/core/utils/shared.util';

export interface Loan {
  id: number;
  title: string;
  amount: number;
  currency: string;
  nextInstallmentDate: Date;
}

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
})
export class LoanComponent implements OnInit {
  loans: Loan[] = [];
  user: LoggedinUserModel;
  accounts: AccountModel[];
  accountLinks: CardModel[];

  loanMenuItems: TransactMenuItem[] = [
    {
      leftIcon: 'withdraw',
      text: 'Apply for loan',
      subtext: 'An account, card or mobile wallet',
    },
    {
      leftIcon: 'withdraw',
      text: 'Repay loan',
      subtext: 'Save, transact, borrow and more',
    },
  ];

  constructor(
    private loanService: LoanService,
    private readonly authService: AuthService,) {
    this.getLoanAccounts();
    console.log("LOADED ")
  }

  ngOnInit(): void {
    this.eventsSubscriptions() 
  }

  getLoanAccounts(){
    this.loanService.getLoanAccounts(this.authService.userState.corporateId);
  }

  eventsSubscriptions() {
     this.loanService
      .loanAccounts$
      .subscribe(accounts =>{
        if(accounts){
          console.log(accounts)
          this.accountLinks=accounts.map((item,i)=>({
          type: 'EquityRegular',
          text:item.accountName,
          subText: SharedUtils.formatMoney(item.balance),
          footerText: `${SharedUtils.formatMoney(item.paidAmount || 0)} • Paid`,
          route: 'detail/'+i}))
  }});
  }

}
