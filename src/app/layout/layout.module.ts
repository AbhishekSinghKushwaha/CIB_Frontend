import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatStyleModule } from '../mat-style.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    RouterModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class LayoutModule { }
