import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { UserListRoutingModule } from './user-list-routing.module';
import { ProductsConstants } from 'src/app/core/utils/constants/products.constants';
import { RolesConstants } from 'src/app/core/utils/constants/roles.constants';
import { UserListComponent } from './user-list.component';
import { UserListSearchModalComponent } from './components/user-list-search-modal/user-list-search-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListActionsModalComponent } from './components/user-list-actions-modal/user-list-actions-modal.component';
import { ConfirmDialogModule } from 'src/app/presentation/shared/modals/confirm-dialog/confirm-dialog.module';
import { PromptModalModule } from 'src/app/presentation/shared/modals/prompt-modal/prompt-modal.module';

@NgModule({
  declarations: [
    UserListComponent,
    UserListSearchModalComponent,
    UserListActionsModalComponent,
  ],
  imports: [
    UserListRoutingModule,
    CommonModule,
    SharedComponentsModule,
    MatStyleModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    PromptModalModule
  ],
  providers: [RolesConstants, ProductsConstants],
})
export class UserListModule {}
