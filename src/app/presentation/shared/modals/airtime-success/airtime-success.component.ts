import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddBeneficiaryService } from 'src/app/core/services/add-beneficiary/add-beneficiary.service';
import { AirtimeSuccessService } from 'src/app/core/services/airtime-success/airtime-success.service';

@Component({
  selector: 'app-airtime-success',
  templateUrl: './airtime-success.component.html',
  styleUrls: ['./airtime-success.component.scss']
})
export class AirtimeSuccessComponent implements OnInit {

  data: any;

  constructor(
    private router: Router,
    private readonly addBeneficiaryService: AddBeneficiaryService,
    private readonly airtimeSuccessService: AirtimeSuccessService,
  ) { }

  ngOnInit(): void {
    this.airtimeSuccessService.currentData.subscribe(data => {
      this.data = data;
    });
    console.log(this.data, "data");
  }

  done() {
    this.router.navigate(['/transact'])
  }

  openAddFavourite() {
    this.addBeneficiaryService.open(null);
  }
}
