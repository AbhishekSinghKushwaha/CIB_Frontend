import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchModalComponent } from './branch-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { BranchListItemComponent } from '../../components/branch-list-item/branch-list-item.component'


@NgModule({
  declarations: [
    BranchModalComponent,
    BranchListItemComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ]
})
export class BranchModalModule { }
