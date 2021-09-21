import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-security-challenge',
  templateUrl: './security-challenge.component.html',
  styleUrls: ['./security-challenge.component.scss']
})
export class SecurityChallengeComponent implements OnInit {
  securityChallengeForm: FormGroup = new FormGroup({});
  securityQuestions: string[] = [
    'What village were you born in?',
    'What was the last city you visited?',
    'At what age did you start working'
  ];
  submitted = false;

  constructor(private readonly fb: FormBuilder) {
    this.initOtpForm();
  }

  ngOnInit(): void {
    this.initForm()
  }

  get f(): any {
    return this.securityChallengeFormArray.controls;
  }

  get securityChallengeFormArray(): FormArray {
    return this.securityChallengeForm.get('questions') as FormArray;
  }

  initOtpForm(): void {
    this.securityChallengeForm = this.fb.group({
      questions: this.fb.array([]),
    });
  }

  initForm(): void {
    for (let i = 0; i < this.securityQuestions.length; i++) {
      this.securityChallengeFormArray.push(
        this.fb.control(null, Validators.required)
      );
    }
  }

  submit(): void {

  }

}
