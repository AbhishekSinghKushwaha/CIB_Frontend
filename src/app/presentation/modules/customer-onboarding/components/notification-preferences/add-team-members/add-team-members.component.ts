import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-team-members',
  templateUrl: './add-team-members.component.html',
  styleUrls: ['./add-team-members.component.scss']
})
export class AddTeamMembersComponent implements OnInit {

  constructor(
    private readonly router : Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.router.navigate(['/customer-onboarding/add-members/register']);
  }

}
