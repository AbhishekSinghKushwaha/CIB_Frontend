import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import urlList from "../../service-list.json";
import { StateService } from "../../state/state.service";

interface OwnEquityTransferState {
  favouritesPayload: {};
  transferPayload: {};
}

const initialState: OwnEquityTransferState = {
  favouritesPayload: {},
  transferPayload: {},
};
@Injectable({
  providedIn: "root",
})
export class OwnAccountService extends StateService<OwnEquityTransferState> {
  favouritesPayload$: Observable<any> = this.select(
    (state) => state.favouritesPayload
  );

  transferPayload$: Observable<any> = this.select(
    (state) => state.transferPayload
  );
  constructor(private http: HttpClient) {
    super(initialState);
  }

  setFavouritesPayload(favouritesPayload: any): void {
    this.setState({ favouritesPayload });
  }

  setTransferPayload(transferPayload: any): void {
    this.setState({ transferPayload });
  }

  sendToOwnEquityAccount(payload: any): Observable<any> {
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
