import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import urlList from "../../service-list.json";
import { StateService } from "../../state/state.service";

interface IntraBankState {
  transferPayload: {};
  favouritesPayload: {};
}

const initialState: IntraBankState = {
  transferPayload: {},
  favouritesPayload: {},
};
@Injectable({
  providedIn: "root",
})
export class IntrabankService extends StateService<IntraBankState> {
  transferPayload$: Observable<any> = this.select(
    (state) => state.transferPayload
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

  sendToAnotherEquityAccount(payload: any): Observable<any> {
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

  accountSearch(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.getAccountDetails,
      payload
    );
  }
}
