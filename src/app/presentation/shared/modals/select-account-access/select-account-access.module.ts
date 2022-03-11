import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SelectAccountAccessComponent } from './select-account-access.component';
import { SelectAccountAccessService } from 'src/app/core/services/select-account-access/select-account-access.service';

@NgModule({
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    SelectAccountAccessComponent
  ],
  declarations: [
    SelectAccountAccessComponent,
  ],
  providers: [
    SelectAccountAccessService
  ]
})
export class SelectAccountAccessModule { }
