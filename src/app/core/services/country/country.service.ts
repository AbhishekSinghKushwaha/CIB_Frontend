import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CountryModel } from '../../domain/country.model';
import { MatDialog } from '@angular/material/dialog';
import { CountryModalComponent } from 'src/app/presentation/shared/modals/country-modal/country-modal.component';

@Injectable()
export class CountryService {
  selected = new Subject<CountryModel>();
  openedStatus = new Subject<boolean>();
  data: CountryModel;

  constructor(private readonly dialog: MatDialog) { }

  open(country: CountryModel[], category: string) {
    this.openedStatus.next(true);
    return this.dialog.open<CountryModalComponent, any>(CountryModalComponent, {
      disableClose: true,
      data: { country, category },
    });
  }

  get default(): CountryModel {
    return this.data
  }

  select(country: CountryModel): void {
    this.data = country;
    this.selected.next(this.data)
  }
}
