import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CountryModalComponent } from "./country-modal.component";
import { CountryListItemComponent } from "../../components/country-list-item/country-list-item.component";
import { MatStyleModule } from "src/app/mat-style.module";
import { CountryService } from "src/app/core/services/modal-services/country.service";
import { CountrySelectComponent } from "../../components/country-select/country-select.component";
import { FormElementsModule } from "../../form-elements/form-elements.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    CountryModalComponent,
    CountryListItemComponent,
    CountrySelectComponent,
  ],
  imports: [CommonModule, MatStyleModule, FormsModule, PipesModule],
  exports: [CountrySelectComponent],
  providers: [CountryService],
})
export class CountryModalModule {}
