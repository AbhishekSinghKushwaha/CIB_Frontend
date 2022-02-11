import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListModalComponent } from './user-list-modal.component';
import { UserListService } from 'src/app/core/services/modal-services/user-list.service';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserListModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserListService]
})
export class UserListModalModule { }
