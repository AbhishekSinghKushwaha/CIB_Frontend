import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FavouriteBeneficiaryModel } from 'src/app/core/domain/favourites-beneficiary.model';
import { BeneficiaryManagementModalService } from 'src/app/core/services/beneficiary-management-modal/beneficiary-management-modal.service';

@Component({
  selector: 'app-beneficiary-management-modal',
  templateUrl: './beneficiary-management-modal.component.html',
  styleUrls: ['./beneficiary-management-modal.component.scss']
})
export class BeneficiaryManagementModalComponent implements OnInit {
  selected: FavouriteBeneficiaryModel[] = [];
  searchText: string;
  visibility = true;
  category = 'manage-beneficiary';
  showCheckbox = false;

  constructor(
    readonly dialogRef: MatDialogRef<BeneficiaryManagementModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FavouriteBeneficiaryModel[],
    private readonly beneficiaryManagementModalService: BeneficiaryManagementModalService,) {

    this.selected = beneficiaryManagementModalService.default;
    this.beneficiaryManagementModalService.selected.subscribe((x) => { this.selected = x; console.log(this.selected) });
  }

  ngOnInit(): void { }

  close(): void {
    this.dialogRef.close(true);
  }

  isChecked(account: FavouriteBeneficiaryModel): boolean {
    return this.selected.some(value => value.id === account.id);
  }

  deleteBeneficiaries(): void {
    this.data = this.data.filter(value => !this.selected.some(item => item.id === value.id))
  }

  openBeneficiaryForm(): void {
    // const modal = this.newRecipientService.open(null);
    // this.visibility = false;
    // modal.afterClosed().subscribe(() => {
    //   this.visibility = true;
    // });
  }

  toggleSelect(): void {
    this.showCheckbox = !this.showCheckbox;
  }

  resetBeneficiaries(): void {
    this.searchText = '';
  }
}
