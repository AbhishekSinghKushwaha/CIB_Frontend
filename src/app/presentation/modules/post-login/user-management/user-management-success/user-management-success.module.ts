import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementSuccessComponent } from './user-management-success.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { UserManagementSuccessRoutingModule } from './user-management-success-routing.module';



@NgModule({
  declarations: [
    UserManagementSuccessComponent
  ],
  imports: [
    UserManagementSuccessRoutingModule,
    CommonModule,    
    MatStyleModule
  ]
})
export class UserManagementSuccessModule { }
