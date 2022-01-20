import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferFromModalComponent } from './transfer-from-modal.component';
import { TransferFromService } from 'src/app/core/services/modal-services/transfer-from.service';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from '../../components/shared-components.module';

@NgModule({
  declarations: [TransferFromModalComponent],
  imports: [CommonModule, MatStyleModule, SharedComponentsModule],
  exports: [TransferFromModalComponent],
  providers: [TransferFromService],
})
export class TransferFromModalModule {}
