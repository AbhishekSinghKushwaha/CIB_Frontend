import { ProfileDetailRoutingModule } from './profile-detail-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailComponent } from './profile-detail.component';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';



@NgModule({
  declarations: [ProfileDetailComponent],
  imports: [
    CommonModule,
    ProfileDetailRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    FormElementsModule,
    SharedModalsModule
  ]
})
export class ProfileDetailModule { }
