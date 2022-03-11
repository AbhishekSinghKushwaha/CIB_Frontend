import { Component, OnInit, Input } from '@angular/core';
import { AirtimeAmountRangeModel } from 'src/app/core/domain/international-airtime-amount-range.model';
import { InternationalAirtimeAmountRangeService } from 'src/app/core/services/international-airtime-amount-range/international-airtime-amount-range.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { accountLimitValidator } from 'src/app/core/utils/validators/limits.validators';

@Component({
  selector: 'app-select-airtime-amount',
  templateUrl: './select-airtime-amount.component.html',
  styleUrls: ['./select-airtime-amount.component.scss']
})
export class SelectAirtimeAmountComponent implements OnInit {

  @Input() isChecked: boolean;
  @Input() data: AirtimeAmountRangeModel;
  selected: AirtimeAmountRangeModel;

  constructor(
    private readonly internationalAirtimeAmountRangeService: InternationalAirtimeAmountRangeService,
  ) {
    this.selected = this.internationalAirtimeAmountRangeService.default;
    this.internationalAirtimeAmountRangeService.selected.subscribe((x) => this.selected = x);
  }

  ngOnInit(): void {
  }

  airTimeForm = new FormGroup({
    amount: new FormControl({}, [Validators.required, accountLimitValidator]),
  });

  select(): void {
    this.internationalAirtimeAmountRangeService.select(this.data);
  }
  
}
