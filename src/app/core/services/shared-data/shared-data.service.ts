import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BankModel, CountryModel } from '../../domain/bank.model';
import { FromAccount } from '../../domain/transfer.models';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  banks = new BehaviorSubject<BankModel[]>([]);
  countries = new BehaviorSubject<CountryModel[]>([]);
  userAccounts = new BehaviorSubject<FromAccount[]>([]);
  constructor() {}

  setBanks(data: BankModel[]) {
    this.banks.next(data);
  }

  setUserAccounts(accounts: FromAccount[]) {
    this.userAccounts.next(accounts);
  }

  setSubsidiaries(countries: CountryModel[]) {
    this.countries.next(countries);
  }
}
