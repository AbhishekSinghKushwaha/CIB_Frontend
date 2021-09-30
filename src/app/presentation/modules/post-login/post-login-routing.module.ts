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
        loadChildren: (): Promise<any> => import('./transact/transact.module').then(m => m.TransactModule)
      },
    ]
  },
  {

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostLoginRoutingModule { }
