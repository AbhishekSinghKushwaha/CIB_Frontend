import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule, KeyValuePipe } from "@angular/common";

import { StandingOrdersRoutingModule } from './standing-orders-routing.module';
import { StandingOrdersComponent } from './standing-orders.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';
import { StandingOrdersDetailModule } from 'src/app/presentation/modules/post-login/transact/standing-orders/standing-orders-detail/standing-orders-detail.module';
import { StandingOrdersFormModule } from 'src/app/presentation/modules/post-login/transact/standing-orders/standing-orders-form/standing-orders-form.module';
import { TransactionTypeService } from 'src/app/core/services/transaction-type/transaction-type.service';
import { LanguageTranslateModule } from "src/app/translate.module";
import { PipesModule } from "src/app/presentation/shared/pipes/pipes.module";

@NgModule({
  declarations: [
    StandingOrdersComponent
  ],
  imports: [
    CommonModule,
    StandingOrdersRoutingModule,
    MatStyleModule,
    SharedComponentsModule,
    FormElementsModule,
    SharedModalsModule,
    StandingOrdersDetailModule,
    StandingOrdersFormModule,
    LanguageTranslateModule.forRoot(),
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [
    TransactionTypeService,
    KeyValuePipe
  ]
})
export class StandingOrdersModule { }
