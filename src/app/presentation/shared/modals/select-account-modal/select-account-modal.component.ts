import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { SelectAccountModel } from 'src/app/core/domain/select-account.model';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';

@Component({
  selector: 'app-select-account-modal',
  templateUrl: './select-account-modal.component.html',
  styleUrls: ['./select-account-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectAccountModalComponent implements OnInit {
  selected: SelectAccountModel;

  constructor(
    readonly dialogRef: MatDialogRef<SelectAccountModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectAccountModel[],
    private readonly selectAccountModalService: SelectAccountModalService
  ) { }

  ngOnInit(): void {
    this.selectAccountModalService.selectedAccount.subscribe((x) => this.selected=x);
  }

  close(): void {
    this.dialogRef.close(true);
  }

}
