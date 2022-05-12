import { BreakpointObserver, MediaMatcher } from "@angular/cdk/layout";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { Router } from "@angular/router";
import { delay } from "rxjs/operators";
import { AccountsService } from "src/app/core/services/accounts/accounts.service";
import { BeneficiaryManagementService } from "src/app/core/services/beneficiary-management/beneficiary-management.service";
import { DataLookupService } from "src/app/core/services/data-lookup/data-lookup.service";
import { SharedDataService } from "src/app/core/services/shared-data/shared-data.service";
import { SpinnerService } from "src/app/core/services/spinner/spinner.service";
import { StorageService } from "src/app/core/services/storage/storage.service";

@Component({
  selector: "app-post-login",
  templateUrl: "./post-login.component.html",
  styleUrls: ["./post-login.component.scss"],
})
export class PostLoginComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  mobileQuery!: MediaQueryList;
  private mobileQueryListener!: () => void;
  loading: boolean = false;
  constructor(
    private observer: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef,
    private mediaMatcher: MediaMatcher,
    private router: Router,
    private spinnerService: SpinnerService,
    private dataLookupService: DataLookupService,
    private storageService: StorageService,
    private accountsService: AccountsService,
    private sharedDataService: SharedDataService,
    private beneficiaryService: BeneficiaryManagementService
  ) {
    this.getMobileQuery();
    this.mobileQueryListener = (): void => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.getBanks();
    this.getCountries();
    this.getUserAccounts();
    this.getSectors();
    this.loadingListener();
    this.getBeneficiaries();
    this.getTelcos();
    this.getMobileWallets();
    this.getSubsidiaries();
    this.getCurrencies();
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    if (this.mobileQuery) {
      this.mobileQuery.removeEventListener("change", this.mobileQueryListener);
    }
  }

  getMobileQuery(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes("verify")) {
      this.mobileQuery = this.mediaMatcher.matchMedia("(max-width: 1024px)");
    } else {
      this.mobileQuery = this.mediaMatcher.matchMedia("(max-width: 970px)");
    }
  }

  loadingListener(): void {
    this.spinnerService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading: boolean) => {
        this.loading = loading;
      });
  }

  // Call Data Look up services
  getCountries() {
    this.dataLookupService.getCountries().subscribe((res) => {
      if (res.status) {
        this.storageService.setData("countries", res.data);
      }
    });
  }

  //TODO:: Get user default country to use to call this endpoint
  getBanks() {
    this.dataLookupService.getBanks("KE").subscribe((res) => {
      if (res.status) {
        this.storageService.setData("banks", res.data);
      }
    });
  }

  getUserAccounts() {
    this.accountsService.getUserAccounts().subscribe((res) => {
      if (res.status) {
        this.sharedDataService.setUserAccounts(res.data);
      }
    });
  }

  getCurrencies() {
    this.dataLookupService.getCurrencies().subscribe((res) => {
      if (res.status) {
        this.storageService.setData("currencies", res.data);
      }
    });
  }

  getBeneficiaries() {
    this.beneficiaryService.getAll();
  }

  getTelcos() {
    this.dataLookupService.getTelcos("KE").subscribe((res) => {
      if (res.status) {
        this.storageService.setData("telcos", res.data);
      }
    });
  }

  getMobileWallets() {
    this.dataLookupService.getMobileWallets("KE").subscribe((res) => {
      if (res.status) {
        this.storageService.setData("wallets", res.data);
      }
    });
  }

  getSectors() {
    this.dataLookupService.getSectors().subscribe((res) => {
      if (res.status) {
        this.storageService.setData("sectors", res.data);
      }
    });
  }

  getSubsidiaries() {
    this.dataLookupService.getSubsidiaries().subscribe((res) => {
      if (res.status) {
        this.storageService.setData("subsidiaries", res.data);
      }
    });
  }
}
