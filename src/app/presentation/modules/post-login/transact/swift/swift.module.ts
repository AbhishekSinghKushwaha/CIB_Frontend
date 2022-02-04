import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwiftRoutingModule } from './swift-routing.module';
import { SwiftComponent } from './swift.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';

@NgModule({
  declarations: [SwiftComponent],
  imports: [
    CommonModule,
    SwiftRoutingModule,
    MatStyleModule,
    SharedComponentsModule,
    SharedModalsModule,
    FormElementsModule,
  ],
})
export class SwiftModule {}
