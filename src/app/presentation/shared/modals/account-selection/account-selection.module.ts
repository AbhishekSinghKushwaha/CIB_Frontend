import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSelectionComponent } from './account-selection.component';
import { OwnequityModalService } from '../../../../core/services/ownequity-modal/ownequity-modal.service';
import { MatStyleModule } from 'src/app/mat-style.module';


@NgModule({
  declarations: [
    AccountSelectionComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports:[
    AccountSelectionComponent
  ],
  providers:[
    OwnequityModalService
  ]
})
export class AccountSelectionModule { }
