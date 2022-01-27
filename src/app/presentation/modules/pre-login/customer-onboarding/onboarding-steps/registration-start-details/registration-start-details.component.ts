import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerOnboardingService } from 'src/app/core/services/customer-onboarding/customer-onboarding.service';

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
    private readonly onboardingService: CustomerOnboardingService
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
          this.router.navigate([
            '/auth/customer-onboarding/register/company-details',
          ]);
        } else {
        }
      });
  }
}
