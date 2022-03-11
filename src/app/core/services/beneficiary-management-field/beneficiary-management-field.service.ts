import { Injectable } from '@angular/core';
import { BeneficiaryField } from '../../utils/constants/beneficiary-fields.constants';


@Injectable({
  providedIn: 'root'
})
export class BeneficiaryManagementFieldService {
  
  private assigned: BeneficiaryField[];

  constructor() {
    this.assigned = [];
  } 

  assignClickAction(searchIn: BeneficiaryField[] | undefined, searchFor: string, action: () => void): void {
    if (!searchIn) return;

    const rs = searchIn.find( (field) => {
      console.log(field.fieldType,searchFor)
      return field.fieldType === searchFor})
          rs && this.assigned.push(rs.setClick(action));
    
  }

  clearAllClickActions(): void {
    this.assigned.forEach( (field) => {
      field.setClick( () => null);
    })
  }
}
