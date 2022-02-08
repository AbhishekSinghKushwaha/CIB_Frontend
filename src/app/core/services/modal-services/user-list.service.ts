import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { UserListComponent } from 'src/app/presentation/shared/form-elements/user-list/user-list.component';
import { UserListModel } from '../../domain/user.model';

@Injectable()
export class UserListService {
  selectedUsers = new Subject<UserListModel>();
  modalRef: MatDialogRef<UserListComponent, any>;

  constructor(private readonly dialog: MatDialog) { }

  // openCountry(country: CountryModel[], category: string) {
  //   this.openedStatus.next(true);
  //   this.countryModalRef = this.dialog.open<CountryModalComponent, any>(
  //     CountryModalComponent,
  //     {
  //       maxWidth: '22vw',
  //       disableClose: true,
  //       data: { country, category },
  //     }
  //   );
  //   return this.countryModalRef;
  // }

  // get defaultCountry(): CountryModel {
  //   return this.countryData;
  // }

  // selectCountry(country: CountryModel): void {
  //   this.countryData = country;
  //   this.selectedCountry.next(this.countryData);
  // }

  // closeCountryModal(data: CountryModel): void {
  //   this.selectedCountry.next(this.countryData);
  //   this.countryModalRef.close(data);
  // }
}
