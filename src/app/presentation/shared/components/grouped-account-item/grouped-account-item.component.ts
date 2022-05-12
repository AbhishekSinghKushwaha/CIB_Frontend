import { Output, EventEmitter } from '@angular/core';
import { GroupedAccountService } from './../../../../core/services/modal-services/grouped-account.service';
import { GroupedAccountModel } from './../../../../core/domain/account.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grouped-account-item',
  templateUrl: './grouped-account-item.component.html',
  styleUrls: ['./grouped-account-item.component.scss']
})
export class GroupedAccountItemComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() data: GroupedAccountModel;
  @Output() selectedGroupedAccount = new EventEmitter<GroupedAccountModel>()

  constructor(
    private readonly GroupedAccountService: GroupedAccountService
  ) { }

  ngOnInit() {
  }
  select() {
    this.selectedGroupedAccount.emit(this.data);
  }

}
