import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-team-members-details',
  templateUrl: './team-members-details.component.html',
  styleUrls: ['./team-members-details.component.scss']
})
export class TeamMembersDetailsComponent implements OnInit {

  teamMemberDetailsForm: FormGroup ;

  constructor(private readonly fb: FormBuilder) {
   }

  ngOnInit(): void {

    this.teamMemberDetailsForm = new FormGroup( {
      fullName: new FormControl(''),
      email: new FormControl(''),
      idpp: new FormControl(''),
      mobileNumber: new FormControl(''),
      transactionLimit: new FormControl(''),
      officePhoneNumber: new FormControl(''),
    });
  }

}
