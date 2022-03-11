import { Component, OnInit } from '@angular/core';
import { AddBeneficiaryService } from 'src/app/core/services/add-beneficiary/add-beneficiary.service';
import { BeneficiaryAddedService } from 'src/app/core/services/beneficiary-added/beneficiary-added.service';
 
@Component({
  selector: 'app-beneficiary-added',
  templateUrl: './beneficiary-added.component.html',
  styleUrls: ['./beneficiary-added.component.scss']
})
export class BeneficiaryAddedComponent implements OnInit {

  constructor(
    private addBeneficiaryService: AddBeneficiaryService,
    private beneficiaryAddedService: BeneficiaryAddedService
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.addBeneficiaryService.close();
    this.beneficiaryAddedService.close();
  }

}
