import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostLoginRoutingModule } from './post-login-routing.module';
import { PostLoginComponent } from './post-login.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { LayoutModule } from 'src/app/presentation/layout/layout.module';
import { FormTestingComponent } from './form-testing/form-testing.component';
import { FormElementsModule } from '../../shared/form-elements/form-elements.module';


@NgModule({
  declarations: [
    PostLoginComponent,
    FormTestingComponent
  ],
  imports: [
    CommonModule,
    PostLoginRoutingModule,
    MatStyleModule,
    LayoutModule,
    FormElementsModule
  ]
})
export class PostLoginModule { }
