import { Component, Input, OnInit } from '@angular/core';
import { SubsidiaryModel } from 'src/app/core/domain/bank.model';
import { CountryService } from 'src/app/core/services/country/country.service';

@Component({
  selector: 'app-subsidiary-list-item',
  templateUrl: './subsidiary-list-item.component.html',
  styleUrls: ['./subsidiary-list-item.component.scss'],
})
export class SubsidiaryListItemComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() data: SubsidiaryModel;
  constructor(private readonly countryService: CountryService) {}

  ngOnInit(): void {}

  select(): void {
    this.countryService.selectSubsidiary(this.data);
  }
}
