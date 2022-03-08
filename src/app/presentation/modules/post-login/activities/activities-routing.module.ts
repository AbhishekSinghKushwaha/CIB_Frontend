import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';

const routes: Routes = [{
  path: '',
  component: ActivitiesComponent
},
{
  path: 'detail/:id/:type',
  component: ActivityDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
