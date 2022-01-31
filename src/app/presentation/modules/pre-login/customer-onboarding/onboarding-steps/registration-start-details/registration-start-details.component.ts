import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerOnboardingService } from 'src/app/core/services/customer-onboarding/customer-onboarding.service';
import { DataLookupService } from 'src/app/core/services/data-lookup/data-lookup.service';
import { SharedDataService } from 'src/app/core/services/shared-data/shared-data.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import RegistrationStages from 'src/app/core/utils/constants/customer-onboarding.constants';

@Component({
  selector: 'app-registration-start-details',
  templateUrl: './registration-start-details.component.html',
  styleUrls: ['./registration-start-details.component.scss'],
})
export class RegistrationStartDetailsComponent implements OnInit {
  registrationStartForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly onboardingService: CustomerOnboardingService,
    private dataLookupService: DataLookupService,
    private sharedService: SharedDataService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // Initialize form
  initForm() {
    this.registrationStartForm = this.fb.group({
      accountNumber: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
    });
  }

  submit() {
    this.onboardingService
      .verifyCorporate(this.registrationStartForm.getRawValue())
      .subscribe((res) => {
        if (res.isSuccessful) {
          // Save the corporate ID in storage
          this.storageService.setData('corporateId', res.data.corporateId);
          // check registration stage
          this.checkRegistrationStage(res.data.registrationStage);
        } else {
        }
      });
  }

  checkRegistrationStage(registrationStage: string) {
    switch (registrationStage) {
      case RegistrationStages.ACCOUNT_VERIFIED:
        this.router.navigate([
          '/auth/customer-onboarding/register/company-details',
        ]);
        break;
      case RegistrationStages.CORPORATE_PROFILE_CREATED:
        this.router.navigate([
          '/auth/customer-onboarding/register/company-directors',
        ]);
        break;
      case RegistrationStages.DIRECTORS_ADDED:
        this.router.navigate([
          '/auth/customer-onboarding/register/company-directors',
        ]);
        break;
      case RegistrationStages.DIRECTOR_PROFILE_CREATED:
        this.router.navigate([
          '/auth/customer-onboarding/register/team-members',
        ]);
        break;
      case RegistrationStages.CORPORATE_USER_ADDED:
        this.router.navigate([
          '/auth/customer-onboarding/register/team-members',
        ]);
        break;

      default:
        break;
    }
  }
}
