import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStyleModule } from 'src/app/mat-style.module';
import { AccountCardComponent } from './account-card.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';

@NgModule({
  declarations: [
    AccountCardComponent,
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    SharedComponentsModule
  ],
  exports: [
    AccountCardComponent
  ]
})
export class AccountCardModule { }
