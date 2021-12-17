import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CountryModel } from '../../domain/country.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CountryModalComponent } from 'src/app/presentation/shared/modals/country-modal/country-modal.component';
import { SubsidiaryModel } from '../../domain/bank.model';
import { SubsidiaryModalComponent } from 'src/app/presentation/shared/modals/subsidiary-modal/subsidiary-modal.component';

@Injectable()
export class CountryService {
  selected = new Subject<CountryModel>();
  selectedSubsidiary = new Subject<SubsidiaryModel>();
  openedStatus = new Subject<boolean>();
  data: CountryModel;
  subsidiaryData: SubsidiaryModel;
  modal: MatDialogRef<CountryModalComponent, any>;
  subsidiaryModal: MatDialogRef<SubsidiaryModalComponent, any>;
  constructor(private readonly dialog: MatDialog) {}

  openCountry(country: CountryModel[], category: string) {
    this.openedStatus.next(true);
    this.modal = this.dialog.open<CountryModalComponent, any>(
      CountryModalComponent,
      {
        maxWidth: '500px',
        disableClose: true,
        data: { country, category },
      }
    );
    return this.modal;
  }

  openSubsidiary(subsidiary: SubsidiaryModel[], category: string) {
    this.openedStatus.next(true);
    this.subsidiaryModal = this.dialog.open<SubsidiaryModalComponent, any>(
      SubsidiaryModalComponent,
      {
        disableClose: true,
        data: { subsidiary, category },
      }
    );
    return this.subsidiaryModal;
  }

  get defaultCountry(): CountryModel {
    return this.data;
  }

  get defaultSubsidiary(): SubsidiaryModel {
    return this.subsidiaryData;
  }

  selectCountry(country: CountryModel): void {
    this.data = country;
    this.selected.next(this.data);
  }

  selectSubsidiary(subsidiary: SubsidiaryModel): void {
    this.subsidiaryData = subsidiary;
    this.selectedSubsidiary.next(subsidiary);
  }

  closeCountryModal(data: CountryModel): void {
    this.selected.next(this.data);
    this.modal.close(data);
  }

  closeSubsidiaryModal(data: SubsidiaryModel): void {
    this.selectedSubsidiary.next(this.subsidiaryData);
    this.subsidiaryModal.close(data);
  }
}
