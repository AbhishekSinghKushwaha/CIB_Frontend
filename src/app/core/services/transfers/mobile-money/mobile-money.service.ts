import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MobileWallet } from "src/app/core/domain/transfer.models";
import { StateService } from "../../state/state.service";
import urlList from "../../service-list.json";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
interface MobileMoneyState {
  wallet: MobileWallet;
  transferPayload: {};
  favouritesPayload: {};
}

const initialState: MobileMoneyState = {
  wallet: {},
  transferPayload: {},
  favouritesPayload: {},
};
@Injectable({
  providedIn: "root",
})
export class MobileMoneyService extends StateService<MobileMoneyState> {
  transferPayload$: Observable<any> = this.select(
    (state) => state.transferPayload
  );

  favouritesPayload$: Observable<any> = this.select(
    (state) => state.favouritesPayload
  );

  wallet$: Observable<MobileWallet> = this.select((state) => state.wallet);

  constructor(private http: HttpClient, private router: Router) {
    super(initialState);
  }

  setTransferPayload(transferPayload: any): void {
    this.setState({ transferPayload });
  }

  setFavouritesPayload(favouritesPayload: any): void {
    this.setState({ favouritesPayload });
  }

  getTransferCharges(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.getTransferCharges,
      payload
    );
  }

  sendMobileMoney(transactionType: string) {
    this.transferPayload$.subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.http
          .post<any>(
            environment.apiUrl + urlList.transfers.mobileMoneyTransfer,
            res
          )
          .subscribe((resp) => {
            if (resp.status) {
              this.router.navigate([
                `/transact/transfer-submitted/${transactionType}`,
              ]);
            } else {
              console.log(res.message);
            }
          });
      }
    });
  }
}
