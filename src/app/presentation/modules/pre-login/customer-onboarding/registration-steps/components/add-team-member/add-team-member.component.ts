import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.scss'],
})
export class AddTeamMemberComponent implements OnInit {
  teamMemberDetailsForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.teamMemberDetailsForm = new FormGroup({
      fullName: new FormControl(''),
      email: new FormControl(''),
      idpp: new FormControl(''),
      mobileNumber: new FormControl(''),
      transactionLimit: new FormControl(''),
      officePhoneNumber: new FormControl(''),
    });
  }
}
