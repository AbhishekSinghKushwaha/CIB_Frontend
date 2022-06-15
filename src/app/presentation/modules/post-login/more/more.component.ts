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
  selector: "app-more",
  templateUrl: "./more.component.html",
  styleUrls: ["./more.component.scss"],
})
export class MoreComponent implements OnInit {

  currentCountry: any;
  currentUserDetail: any;
  initials: string

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
    // this.getUserAccounts();
    this.getBanks();
    this.getSubsidiaries();
    this.currentCountry = this.storageService.getData('userCountry');
    this.currentUserDetail = this.storageService.getData('currentUserData');
    // this.details = this.currentUserDetail?.corporate
    console.log(this.currentUserDetail,this.currentUserDetail.corporate, 'currrent')
    this.initials = this.generateInitials(this.currentUserDetail.name)
  }

  

  generateInitials(name: string): string {
    let initials = '';

    for (let i = 0; i < name.length; i++) {
      if (name.charAt(i) === ' ') {
        continue;
      }

      if (name.charAt(i) === name.charAt(i).toUpperCase()) {
        initials += name.charAt(i);

        if (initials.length === 2) {
          break;
        }
      }
    }

    return initials;
  }

  openCountryModal() {
    const countryList = this.storageService.getData('countries')
    const currentUser = this.storageService.getData('currentUserData');
    console.log(currentUser, 'currEEEEE')
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
    this.router.navigate(["/more/intercountry-fund-transfer"]);
  }
  //This has been called already in the post login component.Please remove
  // getUserAccounts() {
  //   this.accountsService.getUserAccounts().subscribe((res) => {
  //     if (res.status) {
  //       this.sharedDataService.setUserAccounts(res.data);
  //     } else {
  //       // TODO:: Notify error
  //     }
  //   });
  // }

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
