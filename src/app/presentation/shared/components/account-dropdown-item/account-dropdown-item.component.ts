import {
  Component,
  Inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectAccountModel } from 'src/app/core/domain/select-account.model';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { SelectAccountModalService } from 'src/app/core/services/modal-services/select-account-modal/select-account-modal.service';
import { SelectAccountModalComponent } from '../../modals/select-account-modal/select-account-modal.component';

@Component({
  selector: 'app-account-dropdown-item',
  templateUrl: './account-dropdown-item.component.html',
  styleUrls: ['./account-dropdown-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountDropdownItemComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() data: FromAccount;
  constructor(
    private readonly selectAccountModalService: SelectAccountModalService
  ) {}

  ngOnInit(): void {}

  select(): void {
    this.selectAccountModalService.select(this.data);
    // this.dialogRef.close()
  }
}
