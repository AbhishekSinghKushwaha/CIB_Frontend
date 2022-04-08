import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import urlList from "../../service-list.json";
import { StateService } from "../../state/state.service";

interface SWIFTState {
  transferPayload: {};
  favouritesPayload: {};
}

const inititalState: SWIFTState = {
  transferPayload: {},
  favouritesPayload: {},
};
@Injectable({
  providedIn: "root",
})
export class SwiftTransferService extends StateService<SWIFTState> {
  transferPayload$: Observable<any> = this.select(
    (state) => state.transferPayload
  );

  favouritesPayload$: Observable<any> = this.select(
    (state) => state.favouritesPayload
  );
  constructor(private http: HttpClient) {
    super(inititalState);
  }

  setTransferPayload(transferPayload: any): void {
    this.setState({ transferPayload });
  }

  setFavouritesPayload(favouritesPayload: any): void {
    this.setState({ favouritesPayload });
  }

  sendViaSwift(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.swiftTransfer,
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
