import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SelectAccountModel } from 'src/app/core/domain/select-account.model';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';

@Component({
  selector: 'app-account-dropdown-item',
  templateUrl: './account-dropdown-item.component.html',
  styleUrls: ['./account-dropdown-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountDropdownItemComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() data: SelectAccountModel;
  constructor(
    private readonly selectAccountModalService: SelectAccountModalService) { }

  ngOnInit(): void {
  }

  select(): void {
    this.selectAccountModalService.selectedAccount.next(this.data);
  }
}
