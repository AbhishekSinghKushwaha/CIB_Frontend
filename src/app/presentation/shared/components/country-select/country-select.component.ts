import { Component, OnInit, Inject, Output, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { CountryModel } from 'src/app/core/domain/country.model';
import { recipientModel } from 'src/app/core/domain/recipient.model';
import { CountryService } from 'src/app/core/services/country/country.service';
import { countrySettings } from 'src/app/core/utils/constants/country.settings';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss']
})
export class CountrySelectComponent implements OnInit {
  visibility = true;
  countries = mockData.countries;
  viewTypes = countrySettings.viewTypes
  @Input() category: string;
  @Output() selected = new Subject<CountryModel>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: recipientModel,
    private readonly countryService: CountryService) { }

  ngOnInit(): void {
  }

  openCountries(): void {
    this.visibility = false;
    const modal = this.countryService.open(this.countries);
    modal.afterClosed().subscribe((data: CountryModel) => {
      this.visibility = true;
      this.selected.next(data);
    });
  }

}
