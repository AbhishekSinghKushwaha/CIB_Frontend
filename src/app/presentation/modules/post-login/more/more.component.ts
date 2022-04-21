import { Component, OnInit } from "@angular/core";
import { AccountsService } from "src/app/core/services/accounts/accounts.service";
import { DataLookupService } from "src/app/core/services/data-lookup/data-lookup.service";
import { SharedDataService } from "src/app/core/services/shared-data/shared-data.service";
import { MoreConstants } from "../../../../core/utils/constants/more.constants";
import { Router } from "@angular/router";

@Component({
  selector: "app-more",
  templateUrl: "./more.component.html",
  styleUrls: ["./more.component.scss"],
})
export class MoreComponent implements OnInit {
  constructor(
    public readonly moreDashboardList: MoreConstants,
    private dataLookUpService: DataLookupService,
    private accountsService: AccountsService,
    private sharedDataService: SharedDataService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getUserAccounts();
    this.getBanks();
    this.getSubsidiaries();
  }

  interCountryFundTransfer() {
    this.router.navigate(["/more/intercountry-fund-transfer"]);
  }

  getUserAccounts() {
    this.accountsService.getUserAccounts().subscribe((res) => {
      if (res.status) {
        this.sharedDataService.setUserAccounts(res.data);
      } else {
        // TODO:: Notify error
      }
    });
  }

  getBanks() {
    this.dataLookUpService.getBanks("KE").subscribe((res) => {
      if (res.status) {
        this.sharedDataService.setBanks(res.data);
      } else {
        // TODO:: Notify error
      }
    });
  }

  getSubsidiaries() {
    this.dataLookUpService.getSubsidiaries().subscribe((res) => {
      if (res.status) {
        this.sharedDataService.setCountries(res.data);
      } else {
        // TODO:: Notify error
      }
    });
  }
}
