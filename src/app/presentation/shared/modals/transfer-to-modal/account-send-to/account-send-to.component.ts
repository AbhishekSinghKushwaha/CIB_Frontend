import { Component, Input, OnInit } from '@angular/core';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { TransferToService } from 'src/app/core/services/modal-services/transfer-to.service';

@Component({
  selector: 'app-account-send-to',
  templateUrl: './account-send-to.component.html',
  styleUrls: ['./account-send-to.component.scss'],
})
export class AccountSendToComponent implements OnInit {
  @Input() accounts: FromAccount[];
  selected: FromAccount;
  isChecked: boolean = false;
  constructor(private transferToService: TransferToService) {
    this.selected = this.transferToService.defaulTransferToAccount;
    this.transferToService.selectedTransferToAccount.subscribe(
      (x) => (this.selected = x)
    );
  }

  ngOnInit(): void {}

  select(data: FromAccount) {
    this.transferToService.selectTransferToAccount(data);
  }
}
