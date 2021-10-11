import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { SelectAccountModel } from 'src/app/core/domain/select-account.model';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';


@Component({
  selector: 'app-select-account-send-to',
  templateUrl: './select-account-send-to.component.html',
  styleUrls: ['./select-account-send-to.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectAccountSendToComponent implements OnInit {
  selected: SelectAccountModel;

  constructor(
    readonly dialogRef: MatDialogRef<SelectAccountSendToComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectAccountModel[],
    private readonly selectAccountModalService: SelectAccountModalService
  ) { }

  ngOnInit(): void {
    this.selectAccountModalService.selectedAccountSendTo.subscribe((x) => this.selected=x);
  }

  close(): void {
    this.dialogRef.close(true);
  }

}
