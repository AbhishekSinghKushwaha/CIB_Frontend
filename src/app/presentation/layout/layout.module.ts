import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatStyleModule } from '../../mat-style.module';
import { RouterModule } from '@angular/router';
import { UserCardListComponent } from './user-card-list/user-card-list.component';

@NgModule({
  declarations: [SidebarComponent, UserCardListComponent],
  imports: [CommonModule, MatStyleModule, RouterModule],
  exports: [SidebarComponent, UserCardListComponent],
})
export class LayoutModule {}
