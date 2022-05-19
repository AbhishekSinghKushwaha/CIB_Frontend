import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { MatStyleModule } from "src/app/mat-style.module";
import { PaymentsAndTransactionsComponent } from "./payments-and-transactions/payments-and-transactions.component";
import { SharedComponentsModule } from "src/app/presentation/shared/components/shared-components.module";

@NgModule({
  declarations: [DashboardComponent, PaymentsAndTransactionsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatStyleModule,
    SharedComponentsModule,
  ],
})
export class DashboardModule {}
