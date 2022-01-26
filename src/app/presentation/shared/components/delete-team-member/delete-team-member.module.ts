import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteTeamMemberComponent } from './delete-team-member.component';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  declarations: [
    DeleteTeamMemberComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    DeleteTeamMemberComponent
  ]
})
export class DeleteTeamMemberModule { }
