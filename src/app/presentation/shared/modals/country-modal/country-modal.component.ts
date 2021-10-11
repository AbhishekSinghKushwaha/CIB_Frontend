import { CountryModel } from 'src/app/core/domain/country.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryService } from 'src/app/core/services/country/country.service';

@Component({
  selector: 'app-country-modal',
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.scss']
})
export class CountryModalComponent implements OnInit {
  selected: CountryModel;

  constructor(
    private readonly dialogRef: MatDialogRef<CountryModalComponent>,
    private readonly countryService: CountryService,
    @Inject(MAT_DIALOG_DATA) public data: CountryModel[],
  ) {
    this.selected = countryService.default;
    this.countryService.selected.subscribe((response) => this.selected = response);
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(this.selected)
  }

}
