import { Component, OnInit, Inject, Output, Input, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, BehaviorSubject } from 'rxjs';
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
  viewTypes = countrySettings.viewTypes;
  selected: CountryModel;
  @Input() category: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: recipientModel,
    private readonly cd: ChangeDetectorRef,
    private readonly countryService: CountryService) {
    this.selected = this.countries[0];
  }

  ngOnInit(): void {
    this.subscribeEvents();
  }

  subscribeEvents(): void {
    this.countryService.selected.subscribe((x) => {
      console.log('selected', x);
      this.selected = x;
      this.cd.detectChanges()
    });
  }

  openCountries(): void {
    this.visibility = false;
    const modal = this.countryService.open(this.countries, this.category);
    modal.afterClosed().subscribe((data: CountryModel) => {
      console.log('Inner', data);
      this.visibility = true;
      this.countryService.openedStatus.next(false);
    });
  }

}
