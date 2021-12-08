import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStyleModule } from 'src/app/mat-style.module';
import { StatementDetailModalComponent } from './statement-detail-modal/statement-detail-modal.component';
import { StatementDetailService } from 'src/app/core/services/statement/statement-detail/statement-detail.service';
import { StatementListModalComponent } from './statement-list-modal/statement-list-modal.component';
import { StatementListService } from 'src/app/core/services/statement/statement-list/statement-list.service';
import { NotificationModalModule } from '../notification-modal/notification-modal.module';

@NgModule({
  declarations: [
    StatementDetailModalComponent,
    StatementListModalComponent,
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    NotificationModalModule
  ],
  exports: [
    StatementDetailModalComponent
  ],
  providers: [
    StatementDetailService,
    StatementListService
  ]
})
export class StatementModalModule { }
