import { Component, OnInit } from '@angular/core';
import { AccountConstants } from 'src/app/core/utils/constants/account.constants';
import { AccountCardComponent } from 'src/app/presentation/shared/components/account-card/account-card.component';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  data: any;

  constructor(private readonly accountConstants: AccountConstants) {
    this.data = accountConstants.ADD_ACCOUNT_DASHBOARD_LIST;
  }

  ngOnInit(): void {
  }

}
