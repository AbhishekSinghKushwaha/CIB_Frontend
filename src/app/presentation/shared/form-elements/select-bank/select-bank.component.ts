import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BankModel } from 'src/app/core/domain/bank.model';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';

@Component({
  selector: 'app-select-bank',
  templateUrl: './select-bank.component.html',
  styleUrls: ['./select-bank.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectBankComponent),
      multi: true,
    },
  ],
})
export class SelectBankComponent implements OnInit {
  // banks: Banks[];

  @Input()
  parentForm!: FormGroup;

  @Input()
  public fieldName!: string;

  @Input()
  public label!: string;

  @Input()
  placeholder!: string;

  public value!: BankModel;

  public changed!: (value: string) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }
  constructor(private readonly selectBankService: BankService) {}

  ngOnInit(): void {
    this.eventsSubscriptions();
  }

  private eventsSubscriptions(): void {
    this.selectBankService.selected.subscribe((response) => {
      this.parentForm.controls.bank.setValue(response);
    });
  }

  public writeValue(value: BankModel): void {
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

  openBankSelectionModal() {
    this.selectBankService.open(mockData.banks);
  }
}
