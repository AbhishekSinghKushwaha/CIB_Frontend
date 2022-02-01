import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { UserListRoutingModule } from './user-list-routing.module';
import { ProductsConstants } from 'src/app/core/utils/constants/products.constants';
import { UserSearchModule } from 'src/app/presentation/shared/modals/user-search/user-search.module';
import { RolesConstants } from 'src/app/core/utils/constants/roles.constants';
import { UserListComponent } from './user-list.component';

@NgModule({
  declarations: [UserListComponent],
  imports: [
    UserListRoutingModule,
    CommonModule,
    SharedComponentsModule,
    MatStyleModule,
    UserSearchModule
  ],
  providers: [RolesConstants, ProductsConstants],
})
export class UserListModule {}
