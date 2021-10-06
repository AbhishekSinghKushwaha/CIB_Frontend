import { Component, OnInit } from '@angular/core';
import { SelectAccountModel } from 'src/app/core/domain/select-account.model';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';

@Component({
  selector: 'app-other-equity-account',
  templateUrl: './other-equity-account.component.html',
  styleUrls: ['./other-equity-account.component.scss']
})
export class OtherEquityAccountComponent implements OnInit {
  accountsMock: SelectAccountModel[] = [{
    name: 'Loot',
    balance: 999999999.99,
    currency: 'KES',
    type: 'Savings'
  }, {
    name: '0700000000',
    balance: 30000,
    currency: 'KES',
    type: 'Mobile account'
  }, {
    name: '073019380132',
    balance: 4430000,
    currency: 'KES',
    type: 'Current'
  }];

  sendFrom: SelectAccountModel;

  constructor(
    private readonly selectAccountService: SelectAccountModalService,
  ) { }

  ngOnInit(): void {
    this.selectAccountService.selectedAccount.subscribe((x) => this.sendFrom = x)
  }



  openAccounts() {
    this.selectAccountService.open(this.accountsMock)
  }

}
