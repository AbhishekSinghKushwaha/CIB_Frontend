import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoreRoutingModule } from './more-routing.module';
import { MoreComponent } from './more.component';

import { TransactConstants } from '../../../../core/utils/constants/transact.constants';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SnackbarModule } from 'src/app/presentation/shared/components/snackbar/snackbar.module';

@NgModule({
  declarations: [
    MoreComponent
  ],
  imports: [
    CommonModule,
    MoreRoutingModule,
    MatStyleModule,
    SnackbarModule,
    SharedComponentsModule
  ],
  providers: [
    TransactConstants
  ]
})
export class MoreModule { }
