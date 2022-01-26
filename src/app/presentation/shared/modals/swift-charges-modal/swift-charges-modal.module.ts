import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiftChargesModalComponent } from './swift-charges-modal.component';
import { SwiftModalsService } from 'src/app/core/services/modal-services/swift-modals.service';
import { MatStyleModule } from 'src/app/mat-style.module';

@NgModule({
  declarations: [SwiftChargesModalComponent],
  imports: [CommonModule, MatStyleModule],
  providers: [SwiftModalsService],
})
export class SwiftChargesModalModule {}
