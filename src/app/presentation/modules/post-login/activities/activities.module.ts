import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ActivitiesRoutingModule } from "./activities-routing.module";
import { ActivitiesComponent } from "./activities.component";
import { SharedComponentsModule } from "src/app/presentation/shared/components/shared-components.module";
import { MatStyleModule } from "src/app/mat-style.module";
import { FormsModule } from "@angular/forms";
import { ActivityDetailComponent } from "./activity-detail/activity-detail.component";
import { TransactionReceiptModalModule } from "src/app/presentation/shared/modals/transaction-receipt-modal/transaction-receipt-modal.module";
import { ConfirmationModalModule } from "src/app/presentation/shared/modals/confirmation-modal/confirmation-modal.module";
import { ConfirmDialogModule } from "src/app/presentation/shared/modals/confirm-dialog/confirm-dialog.module";
import { ActivityOtpVerificationComponent } from "./activity-otp-verification/activity-otp-verification.component";
import { ReasonModalModule } from "src/app/presentation/shared/modals/reason-modal/reason-modal.module";

@NgModule({
  declarations: [
    ActivitiesComponent,
    ActivityDetailComponent,
    ActivityOtpVerificationComponent,
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    FormsModule,
    TransactionReceiptModalModule,
    ConfirmationModalModule,
    ConfirmDialogModule,
    ReasonModalModule,
  ],
})
export class ActivitiesModule {}
