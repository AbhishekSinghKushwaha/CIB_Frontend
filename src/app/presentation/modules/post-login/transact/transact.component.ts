import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/core/services/accounts/accounts.service';
import { DataLookupService } from 'src/app/core/services/data-lookup/data-lookup.service';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';
import { SharedDataService } from 'src/app/core/services/shared-data/shared-data.service';
import { TransactConstants } from '../../../../core/utils/constants/transact.constants';
import { BaseTransactComponent } from './base-transact.component';

@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.scss'],
})
export class TransactComponent implements OnInit {
  constructor(
    public readonly transactDashboardList: TransactConstants,
    private dataLookUpService: DataLookupService,
    private accountsService: AccountsService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.getUserAccounts();
    this.getBanks();
  }

  getUserAccounts() {
    this.accountsService.getUserAccounts().subscribe((res) => {
      if (res.status) {
        this.sharedDataService.setUserAccounts(res.data);
      } else {
        // TODO:: Notify error
      }
    });
  }

  getBanks() {
    this.dataLookUpService.getBanks('KE').subscribe((res) => {
      if (res.status) {
        this.sharedDataService.banks.next(res.data);
      } else {
        // TODO:: Notify error
      }
    });
  }
}
