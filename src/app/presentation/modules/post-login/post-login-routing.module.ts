import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostLoginComponent } from './post-login.component';

const routes: Routes = [
  {
    path: '',
    component : PostLoginComponent,
    children:[
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: (): Promise<any> => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'transact',
        loadChildren: (): Promise<any> => import('./transact/transact.module').then(m => m.TransactModule)
      },
      {
        path: 'borrow',
        loadChildren: (): Promise<any> => import('./borrow/borrow.module').then(m => m.BorrowModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostLoginRoutingModule { }
