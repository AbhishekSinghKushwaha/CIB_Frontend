import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStyleModule } from 'src/app/mat-style.module';
import { AccountCardComponent } from './account-card.component';

@NgModule({
  declarations: [
    AccountCardComponent,
  ],
  imports: [
    CommonModule,
    MatStyleModule,
  ],
  exports: [
    AccountCardComponent
  ]
})
export class AccountCardModule { }
