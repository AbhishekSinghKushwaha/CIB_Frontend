import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StateService } from "../../state/state.service";
import urlList from "../../service-list.json";

interface InterCountryState {
  transferPayload: {};
  favouritesPayload: {};
}

const initialState: InterCountryState = {
  transferPayload: {},
  favouritesPayload: {},
};
@Injectable({
  providedIn: "root",
})
export class IntercountryService extends StateService<InterCountryState> {
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

  sendToSubsidiary(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.sendToSubsidiary,
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
