import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactConstants } from '../../../../core/utils/constants/transact.constants';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { TransactComponent } from './transact.component';
import { TransactRoutingModule } from './transact-routing.module';
import { SnackbarModule } from 'src/app/presentation/shared/components/snackbar/snackbar.module';

@NgModule({
  declarations: [TransactComponent],
  imports: [
    CommonModule,
    TransactRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    SnackbarModule,
  ],
  providers: [TransactConstants],
})
export class TransactModule {}
