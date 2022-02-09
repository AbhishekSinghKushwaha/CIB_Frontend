import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FavouriteBeneficiaryModel } from '../../domain/favourites-beneficiary.model';
import { BeneficiaryManagementModalComponent } from 'src/app/presentation/shared/modals/beneficiary-management-modal/beneficiary-management-modal.component';

@Injectable()
export class BeneficiaryManagementModalService {
  selected = new Subject<FavouriteBeneficiaryModel[]>();
  private data: FavouriteBeneficiaryModel[] = [];

  constructor(private readonly dialog: MatDialog) { }

  open(data: FavouriteBeneficiaryModel[]) {
    return this.dialog.open<BeneficiaryManagementModalComponent, FavouriteBeneficiaryModel[]>(BeneficiaryManagementModalComponent, {
      maxWidth: '500px',
      disableClose: true,
      data
    });
  }

  select(account: FavouriteBeneficiaryModel): void {
    this.data = this.data.some(value => value.id === account.id) ? this.data.filter(value => value.id !== account.id) : [...this.data, account];
    this.selected.next(this.data)
  }

  get default(): FavouriteBeneficiaryModel[] {
    return this.data
  }
}
