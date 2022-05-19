import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { TransactionListmodel } from "../../domain/transaction-list.model";
import { CurrencySelectionService } from "../modal-services/currency-selection.service";
import { TransferFromService } from "../modal-services/transfer-from.service";
import urlList from "../service-list.json";
import { SharedDataService } from "../shared-data/shared-data.service";
import { StateService } from "../state/state.service";
import { StorageService } from "../storage/storage.service";

interface TransctionsState {
  pendingTransactions: TransactionListmodel[];
  historyTransactions: TransactionListmodel[];
  transaction: TransactionListmodel;
  standingOrders: TransactionListmodel[];
  standingOrder: TransactionListmodel;
  approvalPayload: {};
  reinitiatePayload: {};
}

const initialState: TransctionsState = {
  pendingTransactions: [],
  historyTransactions: [],
  transaction: {},
  standingOrders: [],
  standingOrder: {},
  approvalPayload: {},
  reinitiatePayload: {},
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

  reinitiatePayload$: Observable<any> = this.select(
    (state) => state.reinitiatePayload
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private readonly currencySelectionService: CurrencySelectionService,
    private readonly storageService: StorageService,
    private readonly transferFromService: TransferFromService,
    private readonly sharedDataService: SharedDataService
  ) {
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

  setReinitiatePayload(reinitiatePayload: any): void {
    this.setState({ reinitiatePayload });
  }

  async configureEditData(transaction: TransactionListmodel) {
    this.setSendFrom(transaction);
  }

  //Edit configs
  async setSendFrom(data: TransactionListmodel) {
    console.log("Tunafika");
    const accounts = await this.sharedDataService.countries$.toPromise();
    console.log(accounts);
    // this.sharedDataService.userAccounts.subscribe((accounts) => {
    //   const account = accounts.find(
    //     (value) => value.accountNumber === data.sourceAccount
    //   );

    //   this.transferFromService.setTransferFromAccount(account || {});
    // });
  }

  /*******API CALLS******/
  getTransactions(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.statement.getTransactions,
      payload
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

  reinitiateTransaction(transactionType: string) {
    this.reinitiatePayload$
      .pipe(take(1))
      .subscribe((payloadData) => {
        if (payloadData) {
          this.http
            .post<any>(
              environment.apiUrl + urlList.transfers.reinitiateTransaction,
              {
                reference: payloadData.requestReference,
                reInitiateDetails: payloadData,
              }
            )
            .subscribe((res) => {
              if (res.status) {
                this.router.navigate([
                  `/transact/transfer-submitted/${transactionType}`,
                ]);
              }
            });
        }
      })
      .unsubscribe();
  }
}
