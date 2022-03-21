import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import urlList from "../service-list.json";
@Injectable({
  providedIn: "root",
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  /*******API CALLS******/
  getTransactions(): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.statement.getTransactions
    );
  }
}
