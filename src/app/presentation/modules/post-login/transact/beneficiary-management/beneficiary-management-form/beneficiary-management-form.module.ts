import { ReactiveFormsModule } from "@angular/forms";
import { MatStyleModule } from "src/app/mat-style.module";
import { NgModule } from "@angular/core";
import { CommonModule, KeyValuePipe } from "@angular/common";

import { BeneficiaryManagementFormRoutingModule } from "./beneficiary-management-form-routing.module";
import { BeneficiaryManagementFormComponent } from "./beneficiary-management-form.component";
import { BankModalModule } from "src/app/presentation/shared/modals/bank-modal/bank-modal.module";
import { TransactionTypeModalModule } from "src/app/presentation/shared/modals/transaction-type-modal/transaction-type-modal.module";
import { BeneficiaryManagementService } from "src/app/core/services/beneficiary-management/beneficiary-management.service";
import { PipesModule } from "src/app/presentation/shared/pipes/pipes.module";
import { LanguageTranslateModule } from "src/app/translate.module";
import { FormElementsModule } from "src/app/presentation/shared/form-elements/form-elements.module";
import { MobileWalletsService } from "src/app/core/services/modal-services/mobile-wallets.service";

@NgModule({
  declarations: [BeneficiaryManagementFormComponent],
  imports: [
    CommonModule,
    BeneficiaryManagementFormRoutingModule,
    MatStyleModule,
    BankModalModule,
    ReactiveFormsModule,
    TransactionTypeModalModule,
    PipesModule,
    FormElementsModule,
    LanguageTranslateModule.forRoot(),
  ],
  exports: [BeneficiaryManagementFormComponent],
  providers: [BeneficiaryManagementService, KeyValuePipe, MobileWalletsService],
})
export class BeneficiaryManagementFormModule {}
