import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactDashboardComponent } from './transact-dashboard/transact-dashboard.component';
import { TransactRoutingModule } from './transact-routing.module';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  declarations: [
    TransactDashboardComponent
  ],
  imports: [
    CommonModule,
    TransactRoutingModule,
    MatStyleModule
  ]
})
export class TransactModule { }
