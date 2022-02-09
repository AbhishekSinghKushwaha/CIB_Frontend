import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherBanksRoutingModule } from './other-banks-routing.module';
import { OtherBanksComponent } from './other-banks.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';

@NgModule({
  declarations: [OtherBanksComponent],
  imports: [
    CommonModule,
    OtherBanksRoutingModule,
    MatStyleModule,
    FormElementsModule,
    SharedComponentsModule,
    SharedModalsModule,
  ],
  providers: [],
})
export class OtherBanksModule {}
