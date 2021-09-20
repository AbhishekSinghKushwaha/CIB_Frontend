import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validate-credentials',
  templateUrl: './validate-credentials.component.html',
  styleUrls: ['./validate-credentials.component.scss'],
})
export class ValidateCredentialsComponent implements OnInit {
  validateCredentialsForm: FormGroup = new FormGroup({
    validCredentials: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  submitted = false;
  isEmail = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  validateCredentials(): void {
    this.submitted = true;

    if (this.validateCredentialsForm.invalid) {
      return;
    }
  }

  get validateCredentialControls(): any {
    return this.validateCredentialsForm.controls;
  }
}
