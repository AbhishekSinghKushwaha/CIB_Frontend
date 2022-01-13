import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { UserManagementSuccessComponent } from './user-management-success/user-management-success.component';
import { UserManagementSuccessRoutingModule } from './user-management-success/user-management-success-routing.module';

@NgModule({
  declarations: [UserManagementSuccessComponent],
  imports: [
    CommonModule,
    UserManagementSuccessRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
  ],
  providers: [],
})
export class UserManagementModule {}
