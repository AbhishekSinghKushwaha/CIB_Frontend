import { BeneficiaryManagementComponent } from "./beneficiary-management.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BeneficiaryManagementFormComponent } from "./beneficiary-management-form/beneficiary-management-form.component";

const routes: Routes = [
  {
    path: "",
    component: BeneficiaryManagementComponent,
  },
  {
    path: "new",
    component: BeneficiaryManagementFormComponent,
    loadChildren: (): Promise<any> =>
      import(
        "./beneficiary-management-form/beneficiary-management-form.module"
      ).then((m) => m.BeneficiaryManagementFormModule),
  },
  {
    path: "edit/:id",
    component: BeneficiaryManagementFormComponent,
    loadChildren: (): Promise<any> =>
      import(
        "./beneficiary-management-form/beneficiary-management-form.module"
      ).then((m) => m.BeneficiaryManagementFormModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiaryManagementRoutingModule {}
