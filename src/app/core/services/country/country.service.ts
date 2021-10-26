import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CountryModel } from '../../domain/country.model';
import { MatDialog } from '@angular/material/dialog';
import { CountryModalComponent } from 'src/app/presentation/shared/modals/country-modal/country-modal.component';

@Injectable()
export class CountryService {
  selected = new Subject<CountryModel>();
  data:CountryModel;

  constructor(private readonly dialog: MatDialog) { }

  open(data: CountryModel[]) {
    return this.dialog.open<CountryModalComponent, CountryModel[]>(CountryModalComponent, {
      disableClose: true,
      data
    });
  }

  get default():CountryModel{
    return this.data
  }

  select(country: CountryModel): void {
    this.data = country;
    this.selected.next(this.data)
  }
}
