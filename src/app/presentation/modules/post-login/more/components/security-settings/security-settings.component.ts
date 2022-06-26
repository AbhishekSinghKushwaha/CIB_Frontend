import { CountryService } from 'src/app/core/services/modal-services/country.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/core/services/accounts/accounts.service';
import { DataLookupService } from 'src/app/core/services/data-lookup/data-lookup.service';
import { SharedDataService } from 'src/app/core/services/shared-data/shared-data.service';
import { Router } from '@angular/router';
import { CorporateService } from 'src/app/core/services/corporate/corporate.service';

@Component({
  selector: "app-security-settings",
  templateUrl: "./security-settings.component.html",
  styleUrls: ["./security-settings.component.scss"],
})
export class SecuritySettingsComponent implements OnInit {

  listMenuItem= [
    
    
    {
      leftIcon: 'perm_identity',
      text: 'Change your password',
     subtext: 'Create a new password',
      link: '/more/change-password',
    },
    {
      leftIcon: 'collections',
      text: 'Security questions',
     subtext: 'Update your security questions',
      link: 'more/security-questions',
    },];
  constructor(
    private dataLookUpService: DataLookupService,
    private accountsService: AccountsService,
    private sharedDataService: SharedDataService,
    private storageService: StorageService,
    private countryService: CountryService,
    private readonly corporateService: CorporateService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    // this.getUserAccounts();
    
  }

  
  interCountryFundTransfer() {
    this.router.navigate(["/more/intercountry-fund-transfer"]);
  }
  



}
