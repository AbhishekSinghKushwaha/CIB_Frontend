import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SelectAccountModel } from 'src/app/core/domain/select-account.model';
import { SelectAccountSendtoService } from 'src/app/core/services/select-account-sendto/select-account-sendto.service';


@Component({
  selector: 'app-account-send-to',
  templateUrl: './account-send-to.component.html',
  styleUrls: ['./account-send-to.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSendToComponent implements OnInit {

  @Input() isChecked: boolean;
  @Input() data: SelectAccountModel;
  constructor(
    private readonly selectAccountSendtoService: SelectAccountSendtoService) { }

  ngOnInit(): void {
  }

  select(): void {
    this.selectAccountSendtoService.selectedAccountSendTo.next(this.data);
  }

}
