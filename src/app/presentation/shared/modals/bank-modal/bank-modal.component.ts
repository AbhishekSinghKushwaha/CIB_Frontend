import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BankModel } from "src/app/core/domain/bank.model";
import { CountryModel } from "src/app/core/domain/bank.model";
import { DataLookupService } from "src/app/core/services/data-lookup/data-lookup.service";
import { BankService } from "src/app/core/services/modal-services/bank.service";
import { CountryService } from "src/app/core/services/modal-services/country.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { countrySettings } from "src/app/core/utils/constants/country.settings";

@Component({
  selector: "app-bank-modal",
  templateUrl: "./bank-modal.component.html",
  styleUrls: ["./bank-modal.component.scss"],
})
export class BankModalComponent implements OnInit {
  selected: BankModel;
  searchText: string;
  country: CountryModel;
  visibility = true;
  countrySelectType = countrySettings.viewTypes.NAME_ONLY;
  banks: BankModel[];
  constructor(
    private readonly dialogRef: MatDialogRef<BankModalComponent>,
    private readonly bankService: BankService,
    private readonly countryService: CountryService,
    private dataLookupService: DataLookupService,
    public storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: CountryModel
  ) {
    this.selected = this.bankService.default;
  }

  ngOnInit(): void {
    this.subscribeEvents();
    this.updateBanks(this.data.countryCode);
  }

  subscribeEvents(): void {
    this.countryService.openedStatus.subscribe((response) =>
      response ? (this.visibility = false) : (this.visibility = true)
    );
    this.bankService.selected.subscribe(
      (response) => (this.selected = response)
    );
  }

  close(): void {
    this.dialogRef.close(true);
  }

  setCountry(country: CountryModel) {
    this.country = country;
  }

  updateBanks(countryCode: string) {
    this.dataLookupService.getBanks(countryCode).subscribe((res) => {
      if (res.status) {
        this.storageService.setData("banks", res.data);
        this.banks = res.data;
      }
    });
  }
}
