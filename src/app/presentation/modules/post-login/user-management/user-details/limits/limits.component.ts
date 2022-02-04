import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LimitEditorService } from 'src/app/core/services/limit-editor/limit-editor.service';
import { CurrencySelectionService } from 'src/app/core/services/modal-services/currency-selection.service';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';

@Component({
  selector: 'app-limits',
  templateUrl: './limits.component.html',
  styleUrls: ['./limits.component.scss']
})
export class LimitsComponent implements OnInit {

  redirectTo: string;
  userLimitsForm: FormGroup;

  constructor(private readonly limitService: LimitEditorService,
    private readonly fb: FormBuilder,
    private readonly currencySelectionService: CurrencySelectionService,    
    private readonly currencySelectionConstants: CurrencySelectionConstants,
    private readonly location: Location) { }

  ngOnInit(): void {    
    this.userLimitsForm = this.limitService.currentUserDetails$.value.get("limits") as FormGroup || this.fb.group({
      userName: new FormControl(null, [Validators.required]),
      currency: new FormControl(null, [Validators.required,]),
      transactionLimit: new FormControl(null, [Validators.required,]),
      dailyLimit: new FormControl(null, [Validators.required,]),
      weeklyLimit: new FormControl(null, [Validators.required,]),
      monthlyLimit: new FormControl(null, [Validators.required,]),
    })
    
    this.currencySelectionService.selected.subscribe((x) => {
      this.userLimitsForm.get('currency')?.setValue(x.currencyCode);
    });    
  }

  openCurrencyModal() {
    this.currencySelectionService.open(
      this.currencySelectionConstants.CURRENCY_LISTINGS
    );
  }

  save(): void {
    this.limitService.save(this.userLimitsForm);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
