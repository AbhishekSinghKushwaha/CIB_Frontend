import { Component, OnInit, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { CollectionOptionService } from 'src/app/core/services/collection-option/collection-option.service';
import { CollectionDeliveryOption } from 'src/app/core/utils/constants/collection-delivery-option.settings';

@Component({
  selector: 'app-collection-option',
  templateUrl: './collection-option.component.html',
  styleUrls: ['./collection-option.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CollectionOptionComponent),
      multi: true,
    },
  ],
})
export class CollectionOptionComponent implements ControlValueAccessor, OnInit {
  sourceAccounts: FromAccount[];
  options = Object.values(CollectionDeliveryOption)

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

  constructor(private readonly collectionOptionService: CollectionOptionService,) { }

  ngOnInit(): void {
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
    this.collectionOptionService.open(this.options);
  }

}
