import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
    (state) => state.favouritesPayload
  );
  favouritesPayload$: Observable<any> = this.select(
    (state) => state.favouritesPayload
  );
  constructor(private http: HttpClient) {
    super(initialState);
  }

  setTransferPayload(transferPayload: any): void {
    this.setState({ transferPayload });
  }

  setFavouritesPayload(favouritesPayload: any): void {
    this.setState({ favouritesPayload });
  }

  sendToOtherBanks(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.sendOwnEquityAccount,
      payload
    );
  }

  getTransferCharges(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.getTransferCharges,
      payload
    );
  }
}
