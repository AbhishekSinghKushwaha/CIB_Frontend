import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentCategoryModalComponent } from './payment-category-modal.component';
import { SwiftModalsService } from 'src/app/core/services/modal-services/swift-modals.service';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [PaymentCategoryModalComponent],
  imports: [CommonModule, MatStyleModule, FormsModule, PipesModule],
  providers: [SwiftModalsService],
})
export class PaymentCategoryModalModule {}
