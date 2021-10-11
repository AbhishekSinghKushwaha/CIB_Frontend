import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryModalComponent } from './country-modal.component';
import { CountryListItemComponent } from './country-list-item/country-list-item.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { CountryService } from 'src/app/core/services/country/country.service';



@NgModule({
  declarations: [
    CountryModalComponent,
    CountryListItemComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  providers:[
    CountryService
  ]
})
export class CountryModalModule { }
