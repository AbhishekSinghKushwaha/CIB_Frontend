import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BeneficiaryModel } from '../../domain/beneficiary.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryManagementService {
  formData = new Subject<BeneficiaryModel[]>();
  beneficiaries: BeneficiaryModel[] = [];
  beneficiaryEdit: BeneficiaryModel;

  constructor() { }

  submitForm(data: BeneficiaryModel) {
    this.beneficiaries = [...this.beneficiaries, data]
    setTimeout(() => {
      this.formData.next(this.beneficiaries)
    }, 0)
  }

  updateForm(data: BeneficiaryModel, id: number) {
    console.log('new', data);
    this.beneficiaries = [...this.beneficiaries.map((value, index) => index + 1 === id ? data : value)];
    console.log('changed', this.beneficiaries);
    setTimeout(() => {
      this.formData.next(this.beneficiaries)
    }, 0)
  }
}
