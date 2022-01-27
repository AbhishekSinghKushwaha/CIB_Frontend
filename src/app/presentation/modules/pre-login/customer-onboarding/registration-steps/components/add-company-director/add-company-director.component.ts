import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerOnboardingService } from 'src/app/core/services/customer-onboarding/customer-onboarding.service';

@Component({
  selector: 'app-add-company-director',
  templateUrl: './add-company-director.component.html',
  styleUrls: ['./add-company-director.component.scss'],
})
export class AddCompanyDirectorComponent implements OnInit {
  addDirectorForm: FormGroup;
  editMode: boolean;
  index: number;

  constructor(
    private readonly route: ActivatedRoute,
    private onboardingService: CustomerOnboardingService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFormState();
  }

  loadFormState() {
    this.index = +this.route.snapshot.params['index'];
    if (this.index) {
      this.initForm({
        fullname: 'Jerry Odiambo',
        email: 'jerry@azenia.com',
        officePhoneCode: '000',
        officePhone: '111 222 33',
        mobilePhoneCode: '000',
        mobilePhone: '111 222 33',
      });
    } else {
      this.initForm({});
    }
  }

  private initForm(data?: any): void {
    this.addDirectorForm = this.fb.group({
      name: ['', [Validators.required]],
      officeNumber: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
    });
  }

  submit() {
    const corporateId = '';
    this.onboardingService
      .addDirector(this.addDirectorForm.getRawValue(), corporateId)
      .subscribe((res) => {
        if (res.isSuccessful) {
          // TODO:: Notify success
          this.router.navigate([
            '/auth/customer-onboarding/register/company-directors',
          ]);
        }
      });
  }
}
