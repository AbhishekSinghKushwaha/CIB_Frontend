import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirtualAccountOpeningWizardComponent } from './virtual-account-opening-wizard.component';

const routes: Routes = [{
  path: '',
  component: VirtualAccountOpeningWizardComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualAccountOpeningWizardRoutingModule { }
