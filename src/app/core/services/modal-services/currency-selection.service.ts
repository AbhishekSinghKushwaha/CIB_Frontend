import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { CurrencySelectionModal } from "../../domain/currency-selection.model";
import { MatDialog } from "@angular/material/dialog";
import { CurrencySelectionComponent } from "src/app/presentation/shared/modals/currency-selection/currency-selection.component";
import { CurrencyModel } from "../../domain/transfer.models";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import urlList from "../service-list.json";
export interface ConversionPayload {
  sourceAccount: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
}
@Injectable({ providedIn: "root" })
export class CurrencySelectionService {
  selected = new Subject<CurrencyModel>();
  private data: CurrencyModel;

  constructor(private readonly dialog: MatDialog, private http: HttpClient) {}

  open(data: CurrencyModel[]): void {
    this.dialog.open<CurrencySelectionComponent, CurrencyModel[]>(
      CurrencySelectionComponent,
      {
        disableClose: true,
        data,
      }
    );
  }

  get default(): CurrencyModel {
    return this.data;
  }

  select(currency: CurrencyModel): void {
    this.data = currency;
    this.selected.next(currency);
  }

  getConversionRate(payload: ConversionPayload): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + urlList.transfers.getConversionRate,
      payload
    );
  }
}
