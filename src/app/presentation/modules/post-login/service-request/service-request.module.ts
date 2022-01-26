import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRequestRoutingModule } from './service-request-routing.module';
import { ServiceRequestComponent } from './service-request.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';


@NgModule({
  declarations: [
    ServiceRequestComponent,
  ],
  imports: [
    CommonModule,
    ServiceRequestRoutingModule,
    MatStyleModule,
    SharedComponentsModule
  ]
})
export class ServiceRequestModule { }
