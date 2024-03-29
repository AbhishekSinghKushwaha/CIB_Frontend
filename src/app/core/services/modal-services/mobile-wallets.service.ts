import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MobileOperatorsModalComponent } from "src/app/presentation/shared/modals/new-recipient-modal/mobile-operators-modal/mobile-operators-modal.component";
import { MobileWallet } from "../../domain/transfer.models";
import { StateService } from "../state/state.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import urlList from "../service-list.json";
interface MobileWalletState {
  wallet: MobileWallet;
  wallets: MobileWallet[];
  transferPayload: {};
}

const initialState: MobileWalletState = {
  wallet: {},
  wallets: [],
  transferPayload: {},
};
@Injectable()
export class MobileWalletsService extends StateService<MobileWalletState> {
  selectedWallet$: Observable<MobileWallet> = this.select(
    (state) => state.wallet
  );

  wallets$: Observable<MobileWallet[]> = this.select((state) => state.wallets);

  mobileWalletModalRef: MatDialogRef<MobileOperatorsModalComponent, any>;

  constructor(private readonly dialog: MatDialog, private http: HttpClient) {
    super(initialState);
  }

  openMobileWalletModal(wallets: MobileWallet[]) {
    this.mobileWalletModalRef = this.dialog.open<
      MobileOperatorsModalComponent,
      any
    >(MobileOperatorsModalComponent, {
      data: wallets,
    });
  }

  selectWallet(wallet: MobileWallet): void {
    this.setState({ wallet });
  }

  setMobileMoneyTransferPayload(transferPayload: any): void {
    this.setState({ transferPayload });
  }

  walletNameEnquiry(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.getAccountDetails,
      payload
    );
  }
}
