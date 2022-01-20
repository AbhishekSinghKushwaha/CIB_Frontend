import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { confirmModal } from 'src/app/presentation/shared/decorators/confirm-dialog.decorator';

@Component({
  selector: 'app-team-members-add',
  templateUrl: './team-members-add.component.html',
  styleUrls: ['./team-members-add.component.scss']
})
export class TeamMembersAddComponent implements OnInit {

  members = [1,2,3,4,5];

  teamMemberDetailsForm: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
  }

  @confirmModal({
    title: 'Are you sure',
    message: 'Once you remove a director, all their details will be deleted. You can add them again anytime.',
    cancelText: 'No, I\'m not',
    confirmText: 'Yes, I\'m sure'
  })
  delete() {
    this.members.pop()
  }
}
