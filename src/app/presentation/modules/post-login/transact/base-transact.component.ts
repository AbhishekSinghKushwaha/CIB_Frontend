import { FromAccount } from "src/app/core/domain/transfer.models";
import { AccountsService } from "src/app/core/services/accounts/accounts.service";

export class BaseTransactComponent  {
  accounts: FromAccount[] =  []
  constructor(private readonly accountService: AccountsService) { 
    
  }


  getUserAccounts() {
    // this.accounts = [ {
    //   accountNumber: 9812319379183,
    //   accountName: 'Savings Account',
    //   balance: 1892313.12,
    //   currency: 'KES',
    //   transactionLimit: 10000
    // }];
    this.accountService.getUserAccounts().subscribe(res => {
      if(res.status) {
        this.accounts = res.data;
      }
    })
  }

  public generateReference(): string {
    return Math.floor(new Date().getTime() * Math.random() * 100).toString().substring(0, 12);
  }
  

}
