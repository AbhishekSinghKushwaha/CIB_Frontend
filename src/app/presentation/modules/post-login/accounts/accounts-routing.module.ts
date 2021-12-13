import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';

const routes: Routes = [{
  path: '',
  component: AccountsComponent
},
{
  path: 'virtual-account',
  loadChildren: (): Promise<any> =>
    import('./virtual-account/virtual-account.module').then(
      (m) => m.VirtualAccountModule
    ),
},
{
  path: '**',
  redirectTo: ''
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
