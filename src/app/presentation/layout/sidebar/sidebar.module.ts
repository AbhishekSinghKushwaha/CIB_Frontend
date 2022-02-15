import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponent } from './sidebar.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SignoutModalModule } from '../../shared/modals/signout-modal/signout-modal.module';
import { ConfirmDialogModule } from '../../shared/modals/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStyleModule,
    SignoutModalModule,
    SidebarRoutingModule,
    ConfirmDialogModule
  ],
  exports: [SidebarComponent],
})
export class SidebarModule { }
