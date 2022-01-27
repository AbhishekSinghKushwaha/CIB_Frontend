import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-start-details',
  templateUrl: './registration-start-details.component.html',
  styleUrls: ['./registration-start-details.component.scss'],
})
export class RegistrationStartDetailsComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({
    accountNumber: new FormControl(null, [Validators.required]),
    registrationNumber: new FormControl(null, [Validators.required]),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {}

  validateRegistrationInformation() {
    if (this.registrationForm.invalid) {
      return;
    }
    this.router.navigate(['/auth/customer-onboarding/register']);
  }
}
