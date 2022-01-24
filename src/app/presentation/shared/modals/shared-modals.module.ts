import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorConfirmationModalComponent } from './director-confirmation-modal/director-confirmation-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';

@NgModule({
  declarations: [
    DirectorConfirmationModalComponent
  ],
  imports: [CommonModule, MatStyleModule],
  providers: [],
})
export class SharedModalsModule { }
