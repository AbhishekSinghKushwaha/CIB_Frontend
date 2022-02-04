import { Component, OnInit, Input } from '@angular/core';
import { CountryModel } from 'src/app/core/domain/bank.model';
import { CountryService } from 'src/app/core/services/modal-services/country.service';

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

  generateInitials(name: string): string {
    let initials = '';

    for (let i = 0; i < name.length; i++) {
      if (name.charAt(i) === ' ') {
        continue;
      }

      if (name.charAt(i) === name.charAt(i).toUpperCase()) {
        initials += name.charAt(i);

        if (initials.length === 2) {
          break;
        }
      }
    }

    return initials;
  }
}
