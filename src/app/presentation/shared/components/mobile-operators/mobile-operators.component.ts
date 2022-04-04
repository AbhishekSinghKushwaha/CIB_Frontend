import { Component, OnInit, Input } from '@angular/core';
import { MobileOperatorModel } from 'src/app/core/domain/mobile-operators.model';
import { MobileOperatorsService } from 'src/app/core/services/mobile-operators/mobile-operators.service';
import { AirtimeMobileNumberService } from 'src/app/core/services/airtime-mobile-number/airtime-mobile-number.service';
import { Telco } from "src/app/core/domain/transfer.models";
import { TelcoService } from "src/app/core/services/modal-services/telco.service";

@Component({
  selector: 'app-mobile-operators',
  templateUrl: './mobile-operators.component.html',
  styleUrls: ['./mobile-operators.component.scss']
})
export class MobileOperatorsComponent implements OnInit {

  @Input() isChecked: boolean;
  @Input() data: Telco;

  constructor(
    private readonly mobileOperatorsService: MobileOperatorsService,
    private readonly airtimeMobileNumberService: AirtimeMobileNumberService,
    private readonly telcoService: TelcoService
  ) { }

  ngOnInit(): void {
  }

  select(): void {
    this.mobileOperatorsService.select(this.data);
    // this.telcoService.selectTelco(this.data);
    this.airtimeMobileNumberService.open(null);
  }

}
