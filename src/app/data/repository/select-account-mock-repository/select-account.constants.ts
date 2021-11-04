import { Injectable } from '@angular/core';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { SelectAccountModel } from '../../../../app/core/domain/select-account.model';

@Injectable()
export class SelectAccountConstants {
  constructor() {}

  accountsMockSendTo: SelectAccountModel[] = [
    {
      name: '0700000000',
      balance: 30000,
      currency: 'KES',
      type: 'Mobile account',
    },
    {
      name: '073019380132',
      balance: 4430000,
      currency: 'KES',
      type: 'Current',
    },
  ];
}
