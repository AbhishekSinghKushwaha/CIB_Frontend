import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { TelcoModalComponent } from "src/app/presentation/shared/modals/telco-modal/telco-modal.component";
import { environment } from "src/environments/environment";
import { Telco } from "../../domain/transfer.models";
import urlList from "../service-list.json";
import { StateService } from "../state/state.service";

interface TelcoState {
  telcos: Telco[];
  selectedTelco: Telco;
}

const initialState: TelcoState = {
  telcos: [],
  selectedTelco: {},
};

@Injectable({
  providedIn: "root",
})
export class TelcoService extends StateService<TelcoState> {
  telcoModalRef: MatDialogRef<TelcoModalComponent, any>;

  selectedTelco$: Observable<Telco> = this.select(
    (state) => state.selectedTelco
  );

  telcos$: Observable<Telco[]> = this.select((state) => state.telcos);
  constructor(private readonly dialog: MatDialog, private http: HttpClient) {
    super(initialState);
  }

  /*******STATE MANAGEMENT**********/
  selectTelco(telco: Telco) {
    this.setState({ selectedTelco: telco });
  }

  /*******API CALLS**********/
  // Get telcos
  getTelcos(countryCode: string): Observable<any> {
    const params = {
      countryCode,
    };
    return this.http.get(environment.apiUrl + urlList.dataLookUp.getTelcos, {
      params,
    });
  }

  /*******MODAL MANAGEMENT**********/
  openTelcoModal(telcos: Telco[]) {
    this.telcoModalRef = this.dialog.open<TelcoModalComponent, any>(
      TelcoModalComponent,
      { disableClose: true, data: telcos, width: "22vw" }
    );
  }
}
