import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionOptionModalComponent } from './collection-option-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  declarations: [
    CollectionOptionModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ]
})
export class CollectionOptionModalModule { }
