import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTeamMemberComponent } from 'src/app/presentation/shared/components/delete-team-member/delete-team-member.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteTeamMemberService {

  dialogRef: any;

  constructor(private readonly dialog: MatDialog) { }

  open() {
    this.dialogRef =  this.dialog.open<DeleteTeamMemberComponent>(DeleteTeamMemberComponent, {
      disableClose: true,
    });
    return this.dialogRef;
  }

  close() {
    this.dialogRef.close()
  }
}
