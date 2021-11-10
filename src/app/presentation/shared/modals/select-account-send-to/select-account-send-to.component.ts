import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { SelectAccountModel } from 'src/app/core/domain/select-account.model';
import { SelectAccountSendtoService } from 'src/app/core/services/select-account-sendto/select-account-sendto.service';
import { FromAccount } from 'src/app/core/domain/transfer.models';


@Component({
  selector: 'app-select-account-send-to',
  templateUrl: './select-account-send-to.component.html',
  styleUrls: ['./select-account-send-to.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectAccountSendToComponent implements OnInit {
  selected: FromAccount;

  constructor(
    readonly dialogRef: MatDialogRef<SelectAccountSendToComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FromAccount[],
    private readonly selectAccountSendtoService: SelectAccountSendtoService
  ) { }

  ngOnInit(): void {
    this.selectAccountSendtoService.selected.subscribe((x) => this.selected=x);
  }

  close(): void {
    this.dialogRef.close(true);
  }

}
