import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { RolesRoutingModule } from './roles-routing.module';



@NgModule({
  declarations: [
    RolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    MatStyleModule
  ]
})
export class RolesModule { }
