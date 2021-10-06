import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignoutModalComponent } from './signout-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SignoutModalService } from '../../../../core/services/signout-modal/signout-modal.service';

@NgModule({
  declarations: [
    SignoutModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports:[
    SignoutModalComponent
  ],
  providers:[
    SignoutModalService
  ]
})
export class SignoutModalModule { }
