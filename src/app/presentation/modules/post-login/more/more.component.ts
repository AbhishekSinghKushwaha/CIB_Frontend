import { CountryService } from 'src/app/core/services/modal-services/country.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/core/services/accounts/accounts.service';
import { DataLookupService } from 'src/app/core/services/data-lookup/data-lookup.service';
import { SharedDataService } from 'src/app/core/services/shared-data/shared-data.service';
import { MoreConstants } from '../../../../core/utils/constants/more.constants';
import { Router } from '@angular/router';
import { CorporateService } from 'src/app/core/services/corporate/corporate.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
})
export class MoreComponent implements OnInit {

  currentCountry: any;

  constructor(
    public readonly moreDashboardList: MoreConstants,
    private dataLookUpService: DataLookupService,
    private accountsService: AccountsService,
    private sharedDataService: SharedDataService,
    private storageService: StorageService,
    private countryService: CountryService,
    private readonly corporateService: CorporateService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getUserAccounts();
    this.getBanks();
    this.getSubsidiaries();
    this.currentCountry = this.storageService.getData('userCountry');
  }

  openCountryModal() {
    const countryList = this.storageService.getData('countries')
    const currentUser = this.storageService.getData('currentUserData');
    this.countryService.openCountry(countryList, '', {}).afterClosed()
      .subscribe((res: any) => {
        console.log(res);
        const payload = {
          countryId: res.countryCode3Chars
        }
        this.corporateService.editUserCountry(currentUser.corporate.id, payload).subscribe((response: any) => {
          if (response.isSuccessful) {
            this.storageService.setData('userCountry', res);
            window.location.reload();
          }
        });
      })
  }

  interCountryFundTransfer() {
    this.router.navigate(['/more/intercountry-fund-transfer']);
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
    this.dataLookUpService.getBanks('KE').subscribe((res) => {
      if (res.status) {
        this.sharedDataService.banks.next(res.data);
      } else {
        // TODO:: Notify error
      }
    });
  }

  getSubsidiaries() {
    this.dataLookUpService.getSubsidiaries().subscribe((res) => {
      if (res.status) {
        this.sharedDataService.countries.next(res.data);
      } else {
        // TODO:: Notify error
      }
    });
  }
}
