import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserResolver } from './resolvers/user.resolver';
import { UserManagementSuccessService } from './services/user-management-success.service';
import { UserAdministrationService } from './services/user-administration.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
  ],
  providers: [
    UserResolver,
    UserManagementSuccessService,
    UserAdministrationService,
  ],
})
export class UserManagementModule { }
