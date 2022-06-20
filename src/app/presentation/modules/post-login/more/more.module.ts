import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoreRoutingModule } from './more-routing.module';
import { MoreComponent } from './more.component';

import { MoreConstants } from '../../../../core/utils/constants/more.constants';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SnackbarModule } from 'src/app/presentation/shared/components/snackbar/snackbar.module';
import { SecuritySettingsComponent } from './components/security-settings/security-settings.component';

@NgModule({
  declarations: [
    MoreComponent,
    SecuritySettingsComponent
  ],
  imports: [
    CommonModule,
    MoreRoutingModule,
    MatStyleModule,
    SnackbarModule,
    SharedComponentsModule
  ],
  providers: [
    MoreConstants
  ]
})
export class MoreModule { }
