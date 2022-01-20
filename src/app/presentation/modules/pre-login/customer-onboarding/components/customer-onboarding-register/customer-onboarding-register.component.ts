import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CustomerOnboardingService } from '../../services/customer-onboarding.service';

@Component({
  selector: 'app-customer-onboarding-register',
  templateUrl: './customer-onboarding-register.component.html',
  styleUrls: ['./customer-onboarding-register.component.scss'],
})
export class CustomerOnboardingRegisterComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({
    accountNumber: new FormControl(null, [Validators.required]),
    registrationNumber: new FormControl(null, [Validators.required]),
  });

  constructor(
    private customerOnboardingService: CustomerOnboardingService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  validateRegistrationInformation() {
    if (this.registrationForm.invalid) {
      return;
    }
    this.customerOnboardingService
      .open()
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate([
          'customer-onboarding/register/company-details',
        ]);
      });
  }
}
