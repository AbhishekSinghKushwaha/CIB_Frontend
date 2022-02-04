import { CountryModel } from 'src/app/core/domain/bank.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryService } from 'src/app/core/services/modal-services/country.service';
import { countrySettings } from 'src/app/core/utils/constants/country.settings';

interface IData {
  country: CountryModel[];
  category: string;
}
@Component({
  selector: 'app-country-modal',
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.scss'],
})
export class CountryModalComponent implements OnInit {
  selected: CountryModel;
  viewTypes = countrySettings.viewTypes;
  searchText: string;

  constructor(
    private readonly countryService: CountryService,
    @Inject(MAT_DIALOG_DATA) public data: IData
  ) {
    this.selected = countryService.defaultCountry;
    this.countryService.selectedCountry.subscribe(
      (response) => (this.selected = response)
    );
  }

  ngOnInit(): void {}

  close(): void {
    this.countryService.closeCountryModal(this.selected);
  }
}
