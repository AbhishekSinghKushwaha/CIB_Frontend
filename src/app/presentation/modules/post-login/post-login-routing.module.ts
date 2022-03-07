import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostLoginComponent } from './post-login.component';

const routes: Routes = [
  {
    path: '',
    component: PostLoginComponent,
    children: [
      // {
      //   path: '',
      //   loadChildren: (): Promise<any> => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      // },
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
      },
      {
        path: 'account',
        loadChildren: (): Promise<any> => import('./accounts/accounts.module').then(m => m.AccountsModule)
      },
      {
        path: 'user-management',
        loadChildren: (): Promise<any> => import('./user-management/user-management.module').then(m => m.UserManagementModule)
      },
      {
        path: 'more',
        loadChildren: (): Promise<any> => import('./more/more.module').then(m => m.MoreModule)
      },
      {
        path: 'activities',
        loadChildren: (): Promise<any> => import('./activities/activities.module').then(m => m.ActivitiesModule)
      },
      {
        path: 'service-request',
        loadChildren: (): Promise<any> => import('./service-request/service-request.module').then(m => m.ServiceRequestModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostLoginRoutingModule { }
