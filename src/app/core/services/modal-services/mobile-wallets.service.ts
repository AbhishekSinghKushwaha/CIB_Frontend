import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MobileOperatorsModalComponent } from "src/app/presentation/shared/modals/new-recipient-modal/mobile-operators-modal/mobile-operators-modal.component";
import { MobileWallet } from "../../domain/transfer.models";
import { StateService } from "../state/state.service";

interface MobileWalletState {
  wallet: MobileWallet;
  wallets: MobileWallet[];
}

const initialState: MobileWalletState = {
  wallet: {},
  wallets: [],
};
@Injectable()
export class MobileWalletsService extends StateService<MobileWalletState> {
  selectedWallet$: Observable<MobileWallet> = this.select(
    (state) => state.wallet
  );

  wallets$: Observable<MobileWallet[]> = this.select((state) => state.wallets);

  mobileWalletModalRef: MatDialogRef<MobileOperatorsModalComponent, any>;

  constructor(private readonly dialog: MatDialog) {
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
}
