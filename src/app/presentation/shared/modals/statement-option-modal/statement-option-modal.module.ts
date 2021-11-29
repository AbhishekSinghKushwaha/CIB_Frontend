import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStyleModule } from 'src/app/mat-style.module';
import { StatementOptionModalComponent } from './statement-option-modal.component';
import { StatementService } from 'src/app/core/services/statement/statement.service';

@NgModule({
  declarations: [
    StatementOptionModalComponent,
  ],
  imports: [
    CommonModule,
    MatStyleModule,
  ],
  exports: [
    StatementOptionModalComponent
  ],
  providers: [
    StatementService
  ]
})
export class StatementOptionModalModule { }
