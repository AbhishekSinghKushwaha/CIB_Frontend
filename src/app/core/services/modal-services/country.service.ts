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

  selectCountry(country: CountryModel): void {
    this.countryData = country;
    this.selectedCountry.next(this.countryData);
  }

  closeCountryModal(data: CountryModel): void {
<<<<<<< HEAD
    this.countryData = data;
    this.selectedCountry.next(this.countryData);
=======
    this.selectCountry(data);
>>>>>>> c331547a4cebd6aaae2000acc6f1ac46bb6639d1
    this.countryModalRef.close(data);
  }
}
