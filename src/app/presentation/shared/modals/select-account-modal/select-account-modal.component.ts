import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { SelectAccountModalService } from 'src/app/core/services/modal-services/select-account-modal/select-account-modal.service';
import { FromAccount } from 'src/app/core/domain/transfer.models';

@Component({
  selector: 'app-select-account-modal',
  templateUrl: './select-account-modal.component.html',
  styleUrls: ['./select-account-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectAccountModalComponent implements OnInit {
  selected: FromAccount;

  constructor(
    readonly dialogRef: MatDialogRef<SelectAccountModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FromAccount[],
    private readonly selectAccountModalService: SelectAccountModalService
  ) {
    this.selected = this.selectAccountModalService.default;
    this.selectAccountModalService.selected.subscribe(
      (x) => (this.selected = x)
    );
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close(true);
  }
}
