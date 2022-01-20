import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-team-members-add',
  templateUrl: './team-members-add.component.html',
  styleUrls: ['./team-members-add.component.scss']
})
export class TeamMembersAddComponent implements OnInit {

  teamMemberDetailsForm: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
  }

}
