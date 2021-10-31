import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountryModalComponent } from './country-modal.component';
import { CountryListItemComponent } from '../../components/country-list-item/country-list-item.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { CountryService } from 'src/app/core/services/country/country.service';
import { CountrySelectComponent } from '../../components/country-select/country-select.component';



@NgModule({
  declarations: [
    CountryModalComponent,
    CountryListItemComponent,
    CountrySelectComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule
  ],
  exports: [CountrySelectComponent],
  providers: [
    CountryService
  ]
})
export class CountryModalModule { }
