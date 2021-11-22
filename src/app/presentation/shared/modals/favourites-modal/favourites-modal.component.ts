import { Component, Input, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FavouriteBeneficiaryModel } from 'src/app/core/domain/favourites-beneficiary.model';
import { BeneficiaryManagementModalService } from 'src/app/core/services/beneficiary-management-modal/beneficiary-management-modal.service';
import { FavouritesModalService } from 'src/app/core/services/favourites-modal/favourites-modal.service';
import { NewRecipientService } from 'src/app/core/services/new-recipient/new-recipient.service';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
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
  visibility = true;

  constructor(
    readonly dialogRef: MatDialogRef<SelectAccountModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FavouriteBeneficiaryModel[],
    private readonly favouritesModalService: FavouritesModalService,
    private readonly newRecipientService: NewRecipientService,
    private readonly beneficiaryManagementModalService: BeneficiaryManagementModalService) {

    this.selected = favouritesModalService.default;
    this.favouritesModalService.selected.subscribe((x) => this.selected = x);
  }

  ngOnInit(): void { }

  close(): void {
    this.dialogRef.close(true);
  }

  openNewRecipient(): void {
    const modal = this.newRecipientService.open(null);
    this.visibility = false;
    modal.afterClosed().subscribe(() => {
      this.visibility = true;
    });
  }

  resetBeneficiaries(): void {
    this.searchText = '';
  }

  openBeneficiaryModal(): void {
    const modal = this.beneficiaryManagementModalService.open(mockData.favourites);
    this.visibility = false;
    modal.afterClosed().subscribe(() => {
      this.visibility = true;
    });
  }
}
