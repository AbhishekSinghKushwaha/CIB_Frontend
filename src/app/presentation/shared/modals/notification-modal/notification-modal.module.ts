import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModalComponent } from './notification-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { NotificationModalService } from '../../../../core/services/notification-modal/notification-modal.service';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { AccountCardModule } from '../../components/account-card/account-card.module';

@NgModule({
  declarations: [NotificationModalComponent],
  imports: [
    CommonModule,
    MatStyleModule,
    SharedComponentsModule,
    AccountCardModule,
  ],
  exports: [NotificationModalComponent],
  providers: [NotificationModalService],
})
export class NotificationModalModule {}
