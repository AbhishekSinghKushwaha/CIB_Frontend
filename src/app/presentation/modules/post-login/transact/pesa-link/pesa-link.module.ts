import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesaLinkRoutingModule } from './pesa-link-routing.module';
import { PesaLinkComponent } from './pesa-link.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';

@NgModule({
  declarations: [PesaLinkComponent],
  imports: [
    CommonModule,
    PesaLinkRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    FormElementsModule,
    SharedModalsModule,
  ],
  providers: [],
})
export class PesaLinkModule {}
