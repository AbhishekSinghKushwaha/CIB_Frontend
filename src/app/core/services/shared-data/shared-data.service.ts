import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BankModel } from '../../domain/bank.model';
import { FromAccount } from '../../domain/transfer.models';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  banks = new BehaviorSubject<BankModel[]>([]);
  userAccounts = new BehaviorSubject<FromAccount[]>([]);
  constructor() {}

  setBanks(data: BankModel[]) {
    this.banks.next(data);
  }

  setUserAccounts(accounts: FromAccount[]) {
    this.userAccounts.next(accounts);
  }
}
