import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BankModel } from 'src/app/core/domain/bank.model';
import { CountryModel } from 'src/app/core/domain/country.model';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { CountryService } from 'src/app/core/services/country/country.service';
import { countrySettings } from 'src/app/core/utils/constants/country.settings';

@Component({
  selector: 'app-bank-modal',
  templateUrl: './bank-modal.component.html',
  styleUrls: ['./bank-modal.component.scss']
})
export class BankModalComponent implements OnInit {
  selected: BankModel;
  searchText: string;
  country: CountryModel;
  visibility = true;
  countrySelectType = countrySettings.viewTypes.NAME_ONLY;

  constructor(
    private readonly dialogRef: MatDialogRef<BankModalComponent>,
    private readonly bankService: BankService,
    private readonly countryService: CountryService,
    @Inject(MAT_DIALOG_DATA) public data: BankModel[],
  ) {
    this.selected = this.bankService.default;
  }

  ngOnInit(): void {
    this.subscribeEvents()
  }

  subscribeEvents(): void {
    this.countryService.openedStatus.subscribe(response => response ? this.visibility = false : this.visibility = true);
    this.bankService.selected.subscribe((response) => this.selected = response);
  }

  close(): void {
    this.dialogRef.close(true);
  }

  setCountry(country: CountryModel) {
    this.country = country;
  }
}
