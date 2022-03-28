import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { BeneficiaryModel } from "../../domain/beneficiary.model";
import { AuthService } from "../auth/auth.service";

import urlList from "../service-list.json";
import { StorageService } from "../storage/storage.service";

export enum BeneficiaryActionResultType {
  GET = 0,
  ADD = 1,
  EDIT = 2,
  DELETE = 3,
}
export interface BeneficiaryActionResult {
  type: BeneficiaryActionResultType;
  data: BeneficiaryModel[];
}
@Injectable({
  providedIn: "root",
})
export class BeneficiaryManagementService {
  formData = new Subject<BeneficiaryActionResult>();

  beneficiaries: BeneficiaryModel[] = [];
  beneficiaryEdit: BeneficiaryModel | undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.authService.IsLoggedIn.subscribe((loggedIn) => {
      if (!loggedIn) {
        //  this.beneficiaries.splice(0);
      }
    });
  }

  submitForm(data: any): void {
    this.http
      .post(environment.apiUrl + urlList.beneficiary.add, data)
      .subscribe(() => {
        this.formData.next({
          type: BeneficiaryActionResultType.ADD,
          data: this.beneficiaries,
        });
        this.beneficiaries.splice(0);

        this.getAll();
        this.router.navigate(["/transact/beneficiary-management"]);
      });
  }

  updateForm(data: any, id: number): void {
    this.http
      .put(environment.apiUrl + urlList.beneficiary.edit, data)
      .subscribe(() => {
        this.beneficiaries = [
          ...this.beneficiaries.map((value, index) =>
            index + 1 === id ? data : value
          ),
        ];
        this.formData.next({
          type: BeneficiaryActionResultType.EDIT,
          data: this.beneficiaries,
        });
        this.getAll();
        this.router.navigate(["/transact/beneficiary-management"]);
      });
  }

  getAll(): void {
    if (this.beneficiaries.length > 0) {
      this.formData.next({
        type: BeneficiaryActionResultType.GET,
        data: this.beneficiaries,
      });
    } else {
      this.http
        .get<BeneficiaryModel[]>(
          environment.apiUrl + urlList.beneficiary.getAll
        )
        .subscribe((rs: any) => {
          this.beneficiaries = [...rs.data];
          this.storageService.setData("beneficiaries", this.beneficiaries);
          this.formData.next({
            type: BeneficiaryActionResultType.GET,
            data: this.beneficiaries,
          });
        });
    }
  }

  getFavourites(): void {
    if (this.beneficiaries.length > 0) {
      this.formData.next({
        type: BeneficiaryActionResultType.GET,
        data: this.beneficiaries.filter((item) => item.favourite === true),
      });
    } else {
      this.http
        .get<BeneficiaryModel[]>(
          environment.apiUrl + urlList.beneficiary.getAll
        )
        .subscribe((rs: any) => {
          this.beneficiaries = [...rs.data];
          this.formData.next({
            type: BeneficiaryActionResultType.GET,
            data: this.beneficiaries,
          });
        });
    }
  }

  getBeneficiary(BeneficiaryId: any): Observable<any> {
    const params = {
      BeneficiaryId,
    };
    return this.http.get(
      environment.apiUrl + urlList.beneficiary.getBeneficiary,
      {
        params,
      }
    );
  }

  deleteById(id: number): void {
    this.http
      .delete(environment.apiUrl + urlList.beneficiary.remove + "?Id=" + id)
      .subscribe(() => {
        this.formData.next({
          type: BeneficiaryActionResultType.DELETE,
          data: this.beneficiaries,
        });
      });
  }

  accountSearch(payload: any): Promise<any> {
    return this.http
      .post(environment.apiUrl + urlList.transfers.getAccountDetails, payload)
      .toPromise();
  }
}
