import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { TransactionListmodel } from "../../domain/transaction-list.model";
import urlList from "../service-list.json";
import { StateService } from "../state/state.service";

interface TransctionsState {
  pendingTransactions: TransactionListmodel[];
  historyTransactions: TransactionListmodel[];
  transaction: TransactionListmodel;
  standingOrders: TransactionListmodel[];
  standingOrder: TransactionListmodel;
  approvalPayload: {};
}

const initialState: TransctionsState = {
  pendingTransactions: [],
  historyTransactions: [],
  transaction: {},
  standingOrders: [],
  standingOrder: {},
  approvalPayload: {},
};
@Injectable({
  providedIn: "root",
})
export class TransactionsService extends StateService<TransctionsState> {
  pendingTransactions$: Observable<TransactionListmodel[]> = this.select(
    (state) => state.pendingTransactions
  );

  historyTransactions$: Observable<TransactionListmodel[]> = this.select(
    (state) => state.historyTransactions
  );

  standingOrders$: Observable<TransactionListmodel[]> = this.select(
    (state) => state.standingOrders
  );

  standingOrder$: Observable<TransactionListmodel> = this.select(
    (state) => state.standingOrder
  );

  transaction$: Observable<TransactionListmodel> = this.select(
    (state) => state.transaction
  );

  approvalPayload$: Observable<any> = this.select(
    (state) => state.approvalPayload
  );

  constructor(private http: HttpClient, private router: Router) {
    super(initialState);
  }
  /*******STATE MANAGEMENT******/
  setPendingTransactions(pendingTransactions: TransactionListmodel[]) {
    this.setState({ pendingTransactions });
  }

  setHistoryTransactions(historyTransactions: TransactionListmodel[]) {
    this.setState({ historyTransactions });
  }

  setStandingOrders(standingOrders: TransactionListmodel[]) {
    this.setState({ standingOrders });
  }

  setStandingOrder(standingOrder: TransactionListmodel) {
    this.setState({ standingOrder });
  }

  setTransaction(transaction: TransactionListmodel) {
    this.setState({ transaction });
  }

  setApprovalPayload(payload: any): void {
    this.setState({ approvalPayload: payload });
  }

  /*******API CALLS******/
  getTransactions(params: any): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.statement.getTransactions,
      { params }
    );
  }

  downloadReceiptAsPdf(transactionReference: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.statement.downloadReceipt,
      transactionReference,
      { responseType: "blob" }
    );
  }

  approveTransaction(transactionType: string) {
    this.approvalPayload$.pipe(take(1)).subscribe((payloadData) => {
      if (payloadData) {
        this.http
          .post<any>(
            environment.apiUrl + urlList.transfers.transactionApproval,
            payloadData
          )
          .subscribe((res) => {
            if (res.status) {
              this.setApprovalPayload({});
              this.router.navigate([
                `/transact/transfer-submitted/${transactionType}`,
              ]);
            }
          });
      }
    });
  }
}
