import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountrySelectComponent } from './country-select.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { CountryService } from 'src/app/core/services/country/country.service';



@NgModule({
  declarations: [
    CountrySelectComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    CountrySelectComponent
  ]
})
export class CountrySelectModule { }
