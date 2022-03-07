import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BeneficiaryModel } from '../../domain/beneficiary.model';
import { mockData } from '../../utils/constants/mockdata.constants';
import { AuthService } from '../auth/auth.service';

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

  beneficiaries: BeneficiaryModel[] =  mockData.beneficiaryList//[];
  beneficiaryEdit: BeneficiaryModel | undefined;

  constructor(private readonly http: HttpClient, private readonly authService: AuthService) {
    this.authService.IsLoggedIn.subscribe( (loggedIn) => {
      if (!loggedIn) {
        //  this.beneficiaries.splice(0);
      }
    })
   }

  submitForm(data: BeneficiaryModel): void {
    this.beneficiaries.push(data)
    this.formData.next({type: BeneficiaryActionResultType.ADD, data: this.beneficiaries})
    /*
    this.http.post(environment.apiUrl + urlList.beneficiary.add, data).subscribe( () => {
        this.formData.next({type: BeneficiaryActionResultType.ADD, data: this.beneficiaries})
        this.beneficiaries.splice(0);
        this.getAll();
    })
    */ 
  }

  updateForm(data: BeneficiaryModel, id: number): void {
    this.beneficiaries = [...this.beneficiaries.map((value, index) => index + 1 === id ? data : value)];
    this.formData.next({type: BeneficiaryActionResultType.EDIT, data: this.beneficiaries})
   /*
    this.http.put(environment.apiUrl + urlList.beneficiary.edit, data).subscribe( () => {
        this.beneficiaries = [...this.beneficiaries.map((value, index) => index + 1 === id ? data : value)];
        this.formData.next({type: BeneficiaryActionResultType.EDIT, data: this.beneficiaries})
    })   
    */
  }
  
  getAll(): void {
    if (this.beneficiaries.length>0) {
      this.formData.next({type: BeneficiaryActionResultType.GET, data: this.beneficiaries})
    } else {
      this.http.get<BeneficiaryModel[]>(environment.apiUrl + urlList.beneficiary.getAll).subscribe( (rs: any) => {
        this.beneficiaries = [...rs.data];
        this.formData.next({type: BeneficiaryActionResultType.GET, data: this.beneficiaries})
      })
    }
  }

  getFavourites(): void {
    if (this.beneficiaries.length>0) {
      this.formData.next({type: BeneficiaryActionResultType.GET, data: this.beneficiaries.filter( (item) => item.favourite === true )})
    } else {
      this.http.get<BeneficiaryModel[]>(environment.apiUrl + urlList.beneficiary.getAll).subscribe( (rs: any) => {
        this.beneficiaries = [...rs.data];
        this.formData.next({type: BeneficiaryActionResultType.GET, data: this.beneficiaries})
      })
    }
    
  }
  
  deleteById(id: number): void {
    this.http.delete(environment.apiUrl + urlList.beneficiary.remove + '?Id=' + id).subscribe( () => {
      this.formData.next({type: BeneficiaryActionResultType.DELETE, data: this.beneficiaries})
    });
  }

}
