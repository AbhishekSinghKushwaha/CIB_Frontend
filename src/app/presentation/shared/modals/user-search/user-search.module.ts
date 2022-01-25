import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSearchComponent } from './user-search.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormElementsModule } from '../../form-elements/form-elements.module';



@NgModule({
  declarations: [
    UserSearchComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormElementsModule
  ]
})
export class UserSearchModule { }
