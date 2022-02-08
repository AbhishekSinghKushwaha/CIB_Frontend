import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BeneficiaryModel } from '../../domain/beneficiary.model';

import urlList from '../service-list.json';
@Injectable({
  providedIn: 'root'
})
export class BeneficiaryManagementService {
  formData = new Subject<BeneficiaryModel[]>();
  beneficiaries: BeneficiaryModel[] = [];
  beneficiaryEdit: BeneficiaryModel;

  constructor(private readonly http: HttpClient) { }

  submitForm(data: BeneficiaryModel) {
    this.beneficiaries = data && [...this.beneficiaries, data];
    this.http.post(environment.apiUrl + urlList.beneficiary.add, data).subscribe( () => {
        this.formData.next(this.beneficiaries)
    }) 
  }

  updateForm(data: BeneficiaryModel, id: number) {
    this.beneficiaries = [...this.beneficiaries.map((value, index) => index + 1 === id ? data : value)];
    setTimeout(() => {
      this.formData.next(this.beneficiaries)
    }, 0)
  }
}
