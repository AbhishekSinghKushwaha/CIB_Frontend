import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostLoginRoutingModule } from './post-login-routing.module';
import { PostLoginComponent } from './post-login.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
    PostLoginComponent
  ],
  imports: [
    CommonModule,
    PostLoginRoutingModule,
    MatStyleModule,
    LayoutModule
  ]
})
export class PostLoginModule { }
