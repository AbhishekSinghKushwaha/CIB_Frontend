import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BeneficiaryModel } from '../../domain/beneficiary.model';

import urlList from '../service-list.json';

export enum BeneficiaryActionResultType {
  GET = 0,
  ADD = 1,
  EDIT = 2,
  DELETE = 3
}
export interface BeneficiaryActionResult {
  type: BeneficiaryActionResultType;
  data: BeneficiaryModel[];
}
@Injectable({
  providedIn: 'root'
})
export class BeneficiaryManagementService {
  formData = new Subject<BeneficiaryActionResult>();

  beneficiaries: BeneficiaryModel[] = [];
  beneficiaryEdit: BeneficiaryModel;

  constructor(private readonly http: HttpClient) { }

  submitForm(data: BeneficiaryModel): void {
    this.beneficiaries = data && [...this.beneficiaries, data];
    this.http.post(environment.apiUrl + urlList.beneficiary.add, data).subscribe( () => {
        this.formData.next({type: BeneficiaryActionResultType.ADD, data: this.beneficiaries})
    }) 
  }

  updateForm(data: BeneficiaryModel, id: number): void {
    this.beneficiaries = [...this.beneficiaries.map((value, index) => index + 1 === id ? data : value)];
    this.http.put(environment.apiUrl + urlList.beneficiary.edit, data).subscribe( () => {
      this.formData.next({type: BeneficiaryActionResultType.EDIT, data: this.beneficiaries})
    })   
  }
  
  getAll(): void {
    if (this.beneficiaries.length>0) {
      this.formData.next({type: BeneficiaryActionResultType.GET, data: this.beneficiaries})
    } else {
      this.http.get<BeneficiaryModel[]>(environment.apiUrl + urlList.beneficiary.getAll).subscribe( (rs: any) => {
        this.beneficiaries = rs.data;
        this.formData.next({type: BeneficiaryActionResultType.GET, data: this.beneficiaries})
      })
    }
  }
  
  deleteById(id: number): void {
    this.http.delete(environment.apiUrl + urlList.beneficiary.remove + '?Id=' + id).subscribe( () => {
      this.beneficiaries.splice(this.beneficiaries.findIndex((item) => item.id === id),1);
      this.formData.next({type: BeneficiaryActionResultType.DELETE, data: this.beneficiaries})
    });
  }

}
