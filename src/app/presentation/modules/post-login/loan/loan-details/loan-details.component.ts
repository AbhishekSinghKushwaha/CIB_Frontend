import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { AccountModel } from 'src/app/core/domain/account.model';
import { CardModel } from 'src/app/core/domain/card.model';
import { LoanService } from 'src/app/core/services/loan/loan.service';
import SharedUtils from 'src/app/core/utils/shared.util';
import { LoanAction } from '../components/loan-action/loan-action.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss'],
})
export class LoanDetailsComponent implements OnInit, OnDestroy {
  loanCard: CardModel;
  loan: AccountModel | undefined;
  loanRightBar: { loanBalance: string, installmentAmount: string, nextInstallmentDate?: string };
  loanId: number;
  subscriptions: Subscription[] = [];
  loanActions: LoanAction[];

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly loanService: LoanService) {
    this.loanId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getLoanAccounts();

    this.loanActions = [
      { icon: 'transact', text: 'Repay Loan', route: '/loan/repayment/' + this.loanId },
      { icon: 'account_information', text: 'Loan information', route: 'pay' },
      {
        icon: 'account_information',
        text: 'Loan statement',
        route: 'borrow/statement',
      },
      { icon: 'account_information', text: 'Top-up Loan', route: 'pay' },
      { icon: 'account_information', text: 'Hide balance', route: 'pay' },
    ];
  }

  ngOnInit(): void {
    this.eventsSubscriptions();
  }

  getLoanAccounts() {
    this.loanService.getLoanAccounts(this.authService.userState.corporateId);
  }


  eventsSubscriptions() {
    this.subscriptions.push(this.loanService
      .loanAccounts$
      .subscribe(accounts => {
        console.log('eventsSubscriptions', accounts);
        if (accounts) {
          console.log('accounts', accounts)
          this.loan = accounts.find((_, i) => i === this.loanId);
          this.loan && (this.loanCard = {
            type: 'EquityLong',
            text: this.loan.accountName,
            subText: `${SharedUtils.formatMoney(this.loan.balance)} ${this.loan.currency}`,
          });
          this.loanRightBar = {
            loanBalance: `${SharedUtils.formatMoney(this.loan?.balance || 0)} KES`,
            installmentAmount: `${SharedUtils.formatMoney(this.loan?.installmentAmount || 0)} KES`,
            nextInstallmentDate: this.loan?.nextInstallmentDate,
          }
        }
      }));
  }

  ngOnDestroy(): void {
    SharedUtils.unSubscribe(this.subscriptions);
  }

}