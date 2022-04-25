import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownListModalComponent } from './dropdown-list-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  declarations: [
    DropdownListModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
})
export class DropdownListModalModule { }
