import { StorageService } from 'src/app/core/services/storage/storage.service';
import { SharedDataService } from 'src/app/core/services/shared-data/shared-data.service';
import { BillersModel } from './../../../../core/domain/bank.model';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BillServiceService } from 'src/app/core/services/transfers/bill-service/bill-service.service';
import { BillersService } from 'src/app/core/services/modal-services/billers.service';

@Component({
  selector: 'app-select-billers',
  templateUrl: './select-billers.component.html',
  styleUrls: ['./select-billers.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectBillersComponent),
      multi: true,
    },
  ],
})
export class SelectBillersComponent implements OnInit {

  billers: BillersModel[];

  @Input()
  parentForm!: FormGroup;

  @Input()
  public fieldName!: string;

  @Input()
  public label!: string;

  @Input()
  placeholder!: string;

  @Input() transactionType!: string;

  public value!: BillersModel

  public changed!: (value: string) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  defaultCountry = {
    countryCode: "KE",
    countryName: "Kenya",
    currency: "KES",
    currencySymbol: "Sh",
    nationality: "Kenyan",
    dialCode: "254",
    flagPath:
      "https://oneequity.blob.core.windows.net/assets/visuals/flags/kenya.svg",
    operatingCountry: true,
    countryCode3Chars: "KEN",
  };

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  constructor(
    private readonly billPaymentService: BillersService,
    private readonly sharedDataService: SharedDataService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.billers = this.storageService.getData('billers')
    console.log(this.billers);
    this.eventSubscriptions();
  }

  private eventSubscriptions(): void {
    this.billPaymentService.selected.subscribe((response) => {
      this.parentForm.controls.payTo.setValue(response);
    })
  }

  public writeValue(value: BillersModel): void {
    this.value = value;
  }

  public onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.changed(value);
  }

  public registerOnChange(fn: any): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  openBillersSelectionModal() {
    this.billPaymentService.open(this.billers);
  }

}
