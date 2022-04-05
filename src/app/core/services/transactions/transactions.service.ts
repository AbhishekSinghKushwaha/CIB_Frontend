import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
}

const initialState: TransctionsState = {
  pendingTransactions: [],
  historyTransactions: [],
  transaction: {},
  standingOrders: [],
  standingOrder: {},
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

  constructor(private http: HttpClient) {
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

  /*******API CALLS******/
  getTransactions(params: any): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.statement.getTransactions,
      { params }
    );
  }
}
