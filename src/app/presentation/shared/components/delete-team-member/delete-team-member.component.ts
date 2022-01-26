import { Component, OnInit } from '@angular/core';
import { DeleteTeamMemberService } from 'src/app/core/services/delete-team-member/delete-team-member.service';

@Component({
  selector: 'app-delete-team-member',
  templateUrl: './delete-team-member.component.html',
  styleUrls: ['./delete-team-member.component.scss']
})
export class DeleteTeamMemberComponent implements OnInit {

  constructor(
    private readonly deleteTeamMemberService: DeleteTeamMemberService
  ) { }

  ngOnInit(): void {
  }

  close() : void {
    this.deleteTeamMemberService.close();
  }

}
