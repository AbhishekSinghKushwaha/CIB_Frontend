import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { NumberSelectModalService } from 'src/app/core/services/number-select-modal/number-select-modal.service';

@Component({
  selector: 'app-select-number',
  templateUrl: './select-number.component.html',
  styleUrls: ['./select-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectNumberComponent),
      multi: true,
    },
  ],
})
export class SelectNumberComponent implements ControlValueAccessor, OnInit {
  sourceAccounts: FromAccount[];

  @Input()
  parentForm!: FormGroup;

  @Input()
  public fieldName!: string;

  @Input()
  public total: number;

  @Input()
  public label!: string;

  @Input()
  placeholder!: string;

  public value: string;

  public changed!: (value: string) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }
  constructor(
    private readonly numberSelectService: NumberSelectModalService,
  ) { }

  ngOnInit(): void {
    this.numberSelectService.selected.subscribe((x) => {
      this.parentForm.controls[this.fieldName].setValue(x);
    });
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

  openModal() {
    // Remove accounts that have been selected under sendTo
    this.numberSelectService.open(this.total).afterClosed().subscribe(() => { });
  }

  // Subscribe to Account Selection Event

  // Get User Accounts
}
