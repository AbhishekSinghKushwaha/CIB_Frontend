import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-company-director',
  templateUrl: './add-company-director.component.html',
  styleUrls: ['./add-company-director.component.scss'],
})
export class AddCompanyDirectorComponent implements OnInit {
  addDirectorForm: FormGroup;
  editMode: boolean;
  index: number;

  constructor(private readonly route: ActivatedRoute) {}

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
    console.log(this.index, data);
    this.addDirectorForm = new FormGroup({
      fullname: new FormControl(data?.fullname || null),
      email: new FormControl(data?.email || null),
      officePhone: new FormControl(data?.officePhone),
      officePhoneCode: new FormControl(data?.officePhoneCode || '000'),
      mobilePhone: new FormControl(data?.mobilePhoneCode || null),
      mobilePhoneCode: new FormControl(data?.mobilePhoneCode || '000'),
    });
  }

  submit() {}
}
