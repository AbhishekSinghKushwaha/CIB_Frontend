import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OtherEquityAccountComponent } from "./other-equity-account.component";

const routes: Routes = [
  {
    path: "",
    component: OtherEquityAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherEquityAccountRoutingModule {}
