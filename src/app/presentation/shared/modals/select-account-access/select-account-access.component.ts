import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { SelectAccountAccessService } from 'src/app/core/services/select-account-access/select-account-access.service';

@Component({
  selector: 'app-select-account-access-modal',
  templateUrl: './select-account-access.component.html',
  styleUrls: ['./select-account-access.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectAccountAccessComponent implements OnInit {
  selected: FromAccount[];

  constructor(
    readonly dialogRef: MatDialogRef<SelectAccountAccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FromAccount[],
    private readonly selectAccountAccessService: SelectAccountAccessService
  ) {
    this.selected = [];
    this.selectAccountAccessService.selected.subscribe((x) => this.selected=x); }

  ngOnInit(): void {
  }

  save(): void {
    this.selectAccountAccessService.selected.next(this.selected);
    this.close();
  }
  
  close(): void {
    this.dialogRef.close(true);
  }

  toggle(account: FromAccount): void {
    if (this.isChecked(account)) {
      this.selected.splice(this.selected.findIndex((index) => account == index),1);
    } else {
      this.selected.push(account);
    }
    this.selectAccountAccessService.select(this.selected);
  }

  isChecked(account: FromAccount): boolean {
    return this.selected.indexOf(account) > -1;
  }

}
