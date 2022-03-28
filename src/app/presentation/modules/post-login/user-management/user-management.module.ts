import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { ProductsConstants } from 'src/app/core/utils/constants/products.constants';
import { RolesConstants } from 'src/app/core/utils/constants/roles.constants';
import { UserResolver } from './resolvers/user.resolver';
import { UserListService } from './user-list/services/user-list.service';
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
    RolesConstants,
    ProductsConstants,
    UserListService,
    UserResolver,
    UserManagementSuccessService,
    UserAdministrationService,
  ],
})
export class UserManagementModule {}
