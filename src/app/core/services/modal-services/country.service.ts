import { BehaviorSubject, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CountryModalComponent } from "src/app/presentation/shared/modals/country-modal/country-modal.component";
import { CountryModel } from "../../domain/bank.model";

@Injectable()
export class CountryService {
  selectedCountry = new Subject<CountryModel>();
  openedStatus = new Subject<boolean>();
  countryData: CountryModel;
  countryModalRef: MatDialogRef<CountryModalComponent, any>;

  constructor(private readonly dialog: MatDialog) {}

  openCountry(country: CountryModel[], category: string, defaultCountry: any) {
    this.openedStatus.next(true);
    this.countryModalRef = this.dialog.open<CountryModalComponent, any>(
      CountryModalComponent,
      {
        maxWidth: "22vw",
        disableClose: true,
        data: { country, category, defaultCountry },
      }
    );
    return this.countryModalRef;
  }

  get defaultCountry(): CountryModel {
    return this.countryData;
  }

  selectCountry(country: any): void {
    this.countryData = country;
    this.selectedCountry.next(this.countryData);
  }

  closeCountryModal(data: CountryModel): void {
    this.selectedCountry.next(this.countryData);
    this.countryModalRef.close(data);
  }
}
