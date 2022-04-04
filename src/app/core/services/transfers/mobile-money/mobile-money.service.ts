import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MobileWallet } from "src/app/core/domain/transfer.models";
import { StateService } from "../../state/state.service";
import urlList from "../../service-list.json";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
interface MobileMoneyState {
  wallet: MobileWallet;
  transferPayload: {};
}

const initialState: MobileMoneyState = {
  wallet: {},
  transferPayload: {},
};
@Injectable({
  providedIn: "root",
})
export class MobileMoneyService extends StateService<MobileMoneyState> {
  transferPayload$: Observable<any> = this.select(
    (state) => state.transferPayload
  );

  wallet$: Observable<MobileWallet> = this.select((state) => state.wallet);

  constructor(private http: HttpClient) {
    super(initialState);
  }

  setTransferPayload(transferPayload: any): void {
    this.setState({ transferPayload });
  }

  getTransferCharges(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.getTransferCharges,
      payload
    );
  }

  sendMobileMoney(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.mobileMoneyTransfer,
      payload
    );
  }
}
