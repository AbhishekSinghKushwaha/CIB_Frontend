import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TransactComponent } from "./transact.component";

const routes: Routes = [
  {
    path: "",
    component: TransactComponent,
  },
  {
    path: "own-equity-account",
    loadChildren: (): Promise<any> =>
      import("./own-equity-account/own-equity-account.module").then(
        (m) => m.OwnEquityAccountModule
      ),
  },
  {
    path: "other-equity-account",
    loadChildren: (): Promise<any> =>
      import("./other-equity-account/other-equity-account.module").then(
        (m) => m.OtherEquityAccountModule
      ),
  },
  {
    path: "mobile-money",
    loadChildren: (): Promise<any> =>
      import("./mobile-money/mobile-money.module").then(
        (m) => m.MobileMoneyModule
      ),
  },
  {
    path: "other-banks",
    loadChildren: (): Promise<any> =>
      import("./other-banks/other-banks.module").then(
        (m) => m.OtherBanksModule
      ),
  },
  {
    path: "pay-bills",
    loadChildren: (): Promise<any> =>
      import("./pay-bills/pay-bills.module").then((m) => m.PayBillsModule),
  },
  {
    path: "buy-goods",
    loadChildren: (): Promise<any> =>
      import("./buy-goods/buy-goods.module").then((m) => m.BuyGoodsModule),
  },
  {
    path: "buy-airtime",
    loadChildren: (): Promise<any> =>
      import("./buy-airtime/buy-airtime.module").then(
        (m) => m.BuyAirtimeModule
      ),
  },
  {
    path: "withdraw",
    loadChildren: (): Promise<any> =>
      import("./withdraw/withdraw.module").then((m) => m.WithdrawModule),
  },
  {
    path: "pay-to-card",
    loadChildren: (): Promise<any> =>
      import("./pay-to-card/pay-to-card.module").then((m) => m.PayToCardModule),
  },
  {
    path: "beneficiary-management",
    loadChildren: (): Promise<any> =>
      import("./beneficiary-management/beneficiary-management.module").then(
        (m) => m.BeneficiaryManagementModule
      ),
  },
  {
    path: "pesa-link",
    loadChildren: (): Promise<any> =>
      import("./pesa-link/pesa-link.module").then((m) => m.PesaLinkModule),
  },
  {
    path: "statement",
    loadChildren: (): Promise<any> =>
      import("./statement/statement.module").then((m) => m.StatementModule),
  },
  {
    path: "swift",
    loadChildren: (): Promise<any> =>
      import("./swift/swift.module").then((m) => m.SwiftModule),
  },
  {
    path: "transfer-submitted/:type",
    loadChildren: () =>
      import("./complete-transfer/complete-transfer.module").then(
        (m) => m.CompleteTransferModule
      ),
  },
  {
    path: "otp-verification/:type",
    loadChildren: () =>
      import("./otp-verify/otp-verification/otp-verification.module").then(
        (m) => m.OtpVerificationModule
      ),
  },
  {
    path: "otp-verification-code/:data/:type",
    loadChildren: () =>
      import(
        "./otp-verify/otp-verification-code/otp-verification-code.module"
      ).then((m) => m.OtpVerificationCodeModule),
  },
  {
    path: "contact-details",
    loadChildren: () =>
      import("./otp-verify/contact-details/contact-details.module").then(
        (m) => m.ContactDetailsModule
      ),
  },
  {
    path: "standing-orders",
    loadChildren: (): Promise<any> =>
      import("./standing-orders/standing-orders.module").then(
        (m) => m.StandingOrdersModule
      ),
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactRoutingModule {}
