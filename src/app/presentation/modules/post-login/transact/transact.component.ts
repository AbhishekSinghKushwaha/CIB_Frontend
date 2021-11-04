import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/core/services/accounts/accounts.service';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';
import { TransactConstants } from '../../../../core/utils/constants/transact.constants';
import { BaseTransactComponent } from './base-transact.component';

@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.scss']
})
export class TransactComponent implements OnInit {

  constructor(public readonly transactDashboardList: TransactConstants) {
    
   }

  ngOnInit(): void {
  }

}
