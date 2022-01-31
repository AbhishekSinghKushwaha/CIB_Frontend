import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceRequestRoutingModule } from './service-request-routing.module';
import { ServiceRequestComponent } from './service-request.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { ChequebookRequestComponent } from './chequebook-request/chequebook-request.component';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';


@NgModule({
  declarations: [
    ServiceRequestComponent,
    ChequebookRequestComponent,
  ],
  imports: [
    CommonModule,
    ServiceRequestRoutingModule,
    MatStyleModule,
    SharedComponentsModule,
    FormElementsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class ServiceRequestModule { }
