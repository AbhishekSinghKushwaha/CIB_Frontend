import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubsidiaryModalComponent } from './subsidiary-modal.component';
import { SubsidiarySelectComponent } from '../../components/subsidiary-select/subsidiary-select.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubsidiaryListItemComponent } from '../../components/subsidiary-list-item/subsidiary-list-item.component';

@NgModule({
  declarations: [
    SubsidiaryModalComponent,
    SubsidiarySelectComponent,
    SubsidiaryListItemComponent,
  ],
  imports: [CommonModule, MatStyleModule, FormsModule, ReactiveFormsModule],
  exports: [SubsidiarySelectComponent],
})
export class SubsidiaryModalModule {}
