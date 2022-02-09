import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherEquityAccountRoutingModule } from './other-equity-account-routing.module';
import { OtherEquityAccountComponent } from './other-equity-account.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';

@NgModule({
  declarations: [OtherEquityAccountComponent],
  imports: [
    CommonModule,
    OtherEquityAccountRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    SharedModalsModule,
    FormElementsModule,
  ],
  providers: [],
})
export class OtherEquityAccountModule {}
