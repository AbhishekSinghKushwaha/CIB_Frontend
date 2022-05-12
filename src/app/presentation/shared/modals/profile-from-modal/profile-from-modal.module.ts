import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFromModalComponent } from './profile-from-modal.component';
import { TransferFromService } from 'src/app/core/services/modal-services/transfer-from.service';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from '../../components/shared-components.module';

@NgModule({
  declarations: [ProfileFromModalComponent],
  imports: [CommonModule, MatStyleModule, SharedComponentsModule],
  exports: [ProfileFromModalComponent],
  providers: [TransferFromService],
})
export class ProfileFromModalModule { }
