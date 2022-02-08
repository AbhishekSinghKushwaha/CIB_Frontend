import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListModalComponent } from './user-list-modal.component';
import { UserListService } from 'src/app/core/services/modal-services/user-list.service';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from '../../components/shared-components.module';



@NgModule({
  declarations: [
    UserListModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    SharedComponentsModule,
  ],
  providers: [UserListService]
})
export class UserListModalModule { }
