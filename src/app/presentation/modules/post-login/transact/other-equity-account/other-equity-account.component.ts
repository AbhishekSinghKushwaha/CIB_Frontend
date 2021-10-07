import { Component, OnInit } from '@angular/core';
import { FavouriteBeneficiaryModel } from 'src/app/core/domain/favourites-beneficiary.model';
import { SelectAccountModel } from 'src/app/core/domain/select-account.model';
import { FavouritesModalService } from 'src/app/core/services/favourites-modal/favourites-modal.service';
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

  favouritesMock: FavouriteBeneficiaryModel[] = [{
    name: 'June Lowela',
    phoneNumber: '+254 700 111 111',
    channel: 'Safaricom',
    country: 'Kenya'
  }, {
    name: 'Kevin Libega',
    phoneNumber: '+256 700 019 019',
    channel: 'MTN',
    country: 'Uganda'
  },];

  sendFrom: SelectAccountModel;
  sendTo: FavouriteBeneficiaryModel;

  constructor(
    private readonly selectAccountService: SelectAccountModalService,
    private readonly favouritesModalService: FavouritesModalService
  ) { }

  ngOnInit(): void {
    this.selectAccountService.selectedAccount.subscribe((x) => this.sendFrom = x);
    this.favouritesModalService.selectedAccount.subscribe((x) => this.sendTo = x);
  }

  openAccounts(): void {
    this.selectAccountService.open(this.accountsMock)
  }

  openFavourites(): void {
    this.favouritesModalService.open(this.favouritesMock)
  }

}
