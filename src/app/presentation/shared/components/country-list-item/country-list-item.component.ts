import { Component, OnInit, Input } from '@angular/core';
import { CountryModel } from 'src/app/core/domain/country.model';
import { CountryService } from 'src/app/core/services/country/country.service';

@Component({
  selector: 'app-country-list-item',
  templateUrl: './country-list-item.component.html',
  styleUrls: ['./country-list-item.component.scss'],
})
export class CountryListItemComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() data: CountryModel;

  constructor(private readonly countryService: CountryService) {}

  ngOnInit(): void {}

  select(): void {
    this.countryService.selectCountry(this.data);
  }
}
