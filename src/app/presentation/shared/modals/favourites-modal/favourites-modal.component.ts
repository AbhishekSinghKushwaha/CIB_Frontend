import { Component, Input, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FavouriteBeneficiaryModel } from 'src/app/core/domain/favourites-beneficiary.model';
import { FavouritesModalService } from 'src/app/core/services/favourites-modal/favourites-modal.service';
import { SelectAccountModalComponent } from '../select-account-modal/select-account-modal.component';

@Component({
  selector: 'app-favourites-modal',
  templateUrl: './favourites-modal.component.html',
  styleUrls: ['./favourites-modal.component.scss'],
})
export class FavouritesModalComponent implements OnInit {
  @Input() isChecked: boolean;
  selected: FavouriteBeneficiaryModel;
  searchText: string;

  constructor(
    readonly dialogRef: MatDialogRef<SelectAccountModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FavouriteBeneficiaryModel[],
    private readonly favouritesModalService: FavouritesModalService) {

    this.selected = favouritesModalService.default;
    this.favouritesModalService.selected.subscribe((x) => this.selected = x);
  }

  ngOnInit(): void {

  }

  close(): void {
    this.dialogRef.close(true);
  }


}
