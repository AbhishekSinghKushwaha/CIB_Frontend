import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import urlList from "../../service-list.json";
import { StateService } from "../../state/state.service";

interface interBankState {
  transferPayload: {};
  favouritesPayload: {};
}

const initialState: interBankState = {
  transferPayload: {},
  favouritesPayload: {},
};
@Injectable({
  providedIn: "root",
})
export class InterbankService extends StateService<interBankState> {
  transferPayload$: Observable<any> = this.select(
    (state) => state.transferPayload
  );
  favouritesPayload$: Observable<any> = this.select(
    (state) => state.favouritesPayload
  );
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

  sendViaInterbankTransfer(transactionType: string) {
    this.transferPayload$.subscribe((payloadData) => {
      if (payloadData) {
        this.http
          .post<any>(
            environment.apiUrl + urlList.transfers.sendOwnEquityAccount,
            payloadData
          )
          .subscribe((resp) => {
            if (resp.status) {
              this.router.navigate([
                `/transact/transfer-submitted/${transactionType}`,
              ]);
            } else {
              console.log(resp.message);
            }
          });
      }
    });
  }
}
