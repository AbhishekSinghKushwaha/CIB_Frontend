import { Component, OnInit } from '@angular/core';
import { DeleteTeamMemberService } from 'src/app/core/services/delete-team-member/delete-team-member.service';

@Component({
  selector: 'app-register-team-members',
  templateUrl: './register-team-members.component.html',
  styleUrls: ['./register-team-members.component.scss']
})
export class RegisterTeamMembersComponent implements OnInit {

  constructor(
    private readonly deleteTeamMemberService: DeleteTeamMemberService
  ) { }

  ngOnInit(): void {
  }

  delete() : void {
    this.deleteTeamMemberService.open();
  }

}
