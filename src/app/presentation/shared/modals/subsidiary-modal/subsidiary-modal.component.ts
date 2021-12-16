import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubsidiaryModel } from 'src/app/core/domain/bank.model';
import { CountryService } from 'src/app/core/services/country/country.service';
import { countrySettings } from 'src/app/core/utils/constants/country.settings';

interface IData {
  subsidiary: SubsidiaryModel[];
  category: string;
}
@Component({
  selector: 'app-subsidiary-modal',
  templateUrl: './subsidiary-modal.component.html',
  styleUrls: ['./subsidiary-modal.component.scss'],
})
export class SubsidiaryModalComponent implements OnInit {
  selected: SubsidiaryModel;
  viewTypes = countrySettings.viewTypes;
  searchText: string;

  constructor(
    private readonly countryService: CountryService,
    @Inject(MAT_DIALOG_DATA) public data: IData
  ) {
    this.selected = countryService.defaultSubsidiary;
    this.countryService.selectedSubsidiary.subscribe(
      (response) => (this.selected = response)
    );
  }

  ngOnInit(): void {}

  close(): void {
    this.countryService.closeSubsidiaryModal(this.selected);
  }
}
