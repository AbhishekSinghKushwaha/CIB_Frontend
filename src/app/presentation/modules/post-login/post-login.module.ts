import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostLoginRoutingModule } from './post-login-routing.module';
import { PostLoginComponent } from './post-login.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormElementsModule } from '../../shared/form-elements/form-elements.module';
import { SidebarModule } from '../../layout/sidebar/sidebar.module';

@NgModule({
  declarations: [PostLoginComponent],
  imports: [
    CommonModule,
    PostLoginRoutingModule,
    MatStyleModule,
    SidebarModule,
    FormElementsModule
  ],
})
export class PostLoginModule {}
