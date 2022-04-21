import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EazzyFxNegotiateComponent } from './eazzy-fx-negotiate/eazzy-fx-negotiate.component';
import { EazzyFxPairComponent } from './eazzy-fx-pair/eazzy-fx-pair.component';
import { EazzyFxRatesComponent } from './eazzy-fx-rates/eazzy-fx-rates.component';
import { EazzyFxComponent } from './eazzy-fx/eazzy-fx.component';

const routes: Routes = [
  {
    path: 'eazzy-fx',
    children: [
      {
        path: 'rates',
        component: EazzyFxComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: EazzyFxRatesComponent,
          },
          {
            path: 'pair',
            component: EazzyFxPairComponent,
          },
        ],
      },
      {
        path: 'negotiate',
        component: EazzyFxNegotiateComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'rates',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForeignExchangeRoutingModule {}
