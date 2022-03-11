import { Component, OnInit, Input } from '@angular/core';
import { MobileOperatorModel } from 'src/app/core/domain/mobile-operators.model';
import { MobileOperatorsService } from 'src/app/core/services/mobile-operators/mobile-operators.service';
import { AirtimeMobileNumberService } from 'src/app/core/services/airtime-mobile-number/airtime-mobile-number.service';

@Component({
  selector: 'app-mobile-operators',
  templateUrl: './mobile-operators.component.html',
  styleUrls: ['./mobile-operators.component.scss']
})
export class MobileOperatorsComponent implements OnInit {

  @Input() isChecked: boolean;
  @Input() data: MobileOperatorModel;


  constructor(
    private readonly mobileOperatorsService: MobileOperatorsService,
    private readonly airtimeMobileNumberService: AirtimeMobileNumberService
  ) { }

  ngOnInit(): void {
  }

  select(): void {
    this.mobileOperatorsService.select(this.data);
    this.airtimeMobileNumberService.open(null);
  }

}
