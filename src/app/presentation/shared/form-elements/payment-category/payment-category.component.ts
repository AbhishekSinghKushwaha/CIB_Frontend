import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SwiftModalsService } from 'src/app/core/services/modal-services/swift-modals.service';

@Component({
  selector: 'app-payment-category',
  templateUrl: './payment-category.component.html',
  styleUrls: ['./payment-category.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaymentCategoryComponent),
      multi: true,
    },
  ],
})
export class PaymentCategoryComponent implements OnInit {
  @Input() parentForm: FormGroup;

  @Input() fieldName: string;

  @Input() label: string;

  @Input() placeholder: string;

  public value: any;

  public changed: (value: string) => void;

  public touched: () => void;

  public isDisabled: boolean;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  constructor(private readonly swiftModalsService: SwiftModalsService) {}

  ngOnInit(): void {
    this.listenToDataStreams();
  }

  public writeValue(value: string): void {
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

  openPaymentCategoryModal() {
    this.swiftModalsService.openPaymentCategoryModal();
  }

  listenToDataStreams() {
    this.swiftModalsService.selectedPaymentCategory.subscribe((x) => {
      this.parentForm.controls.paymentCategory.setValue(x);
    });
  }
}
