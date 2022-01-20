import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-onboarding-register-company-details',
  templateUrl: './customer-onboarding-register-company-details.component.html',
  styleUrls: ['./customer-onboarding-register-company-details.component.scss'],
})
export class CustomerOnboardingRegisterCompanyDetailsComponent
  implements OnInit
{
  mobileQuery!: MediaQueryList;
  detailsForm: FormGroup = new FormGroup({});
  loading: false;
  constructor() {}

  ngOnInit(): void {}

  saveAndContinue() {}

  backgroundImageUrl() {
    return `url(assets/images/backgrounds/one-equity/Landing-pattern.svg)`;
  }

  appLogoSrc() {
    switch (environment.appInstance) {
      case 'bcdc':
        return `./assets/images/logos/${environment.appInstance}/Primary.png`;
      case 'bcdc-mobile':
        return `./assets/images/logos/${environment.appInstance}/BCDC-mobile.svg`;
      case 'one-equity':
        return `./assets/images/logos/${environment.appInstance}/Inverse.svg`;
      default:
        return '';
    }
  }
}
