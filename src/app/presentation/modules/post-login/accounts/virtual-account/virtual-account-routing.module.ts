import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirtualAccountComponent } from './virtual-account.component';

const routes: Routes = [{
  path: '',
  component: VirtualAccountComponent
},
{
  path: 'new-account',
  loadChildren: (): Promise<any> =>
    import('../virtual-account-opening-wizard/virtual-account-opening-wizard.module').then(
      (m) => m.VirtualAccountOpeningWizardModule
    ),
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualAccountRoutingModule { }
