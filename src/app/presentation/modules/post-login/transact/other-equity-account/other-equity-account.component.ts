import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrencySelectionModal } from 'src/app/core/domain/currency-selection.model';
import { FavouriteBeneficiaryModel } from 'src/app/core/domain/favourites-beneficiary.model';
import { SelectAccountModel } from 'src/app/core/domain/select-account.model';
import { CurrencySelectionService } from 'src/app/core/services/currency-selection/currency-selection.service';
import { FavouritesModalService } from 'src/app/core/services/favourites-modal/favourites-modal.service';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';

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
  }];

  sendFrom: SelectAccountModel;
  sendTo: FavouriteBeneficiaryModel;
  currency: CurrencySelectionModal;
  equityForm: FormGroup;
  paymentDate: any;

  constructor(
    private readonly selectAccountService: SelectAccountModalService,
    private readonly favouritesModalService: FavouritesModalService,
    private readonly currencySelectionService:CurrencySelectionService,
    private readonly currencySelectionConstants:CurrencySelectionConstants
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.eventsSubscriptions();
  }

  private eventsSubscriptions(): void {
    this.selectAccountService.selectedAccount.subscribe((x) => this.sendFrom = x);
    this.favouritesModalService.selectedAccount.subscribe((x) => this.sendTo = x);
    this.currencySelectionService.selected.subscribe(x => this.currency = x);
  }

  private initForm(): void {
    this.equityForm = new FormGroup({
      fromAccount: new FormControl(null, [Validators.required]),
      recipient: new FormControl(null, [Validators.required]),
      currency: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      paymentDate: new FormControl(null, [Validators.required]),
      // recipient: new FormControl(null, [Validators.required]),
    });
  }

  openAccounts(): void {
    this.selectAccountService.open(this.accountsMock)
  }

  openFavourites(): void {
    this.favouritesModalService.open(this.favouritesMock)
  }

  openCurrencies():void{
    this.currencySelectionService.open(this.currencySelectionConstants.CURRENCY_LISTINGS)
  }

  submit() {

  }
}
