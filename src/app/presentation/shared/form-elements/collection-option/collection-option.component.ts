import { Component, OnInit, OnDestroy, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { BranchService } from 'src/app/core/services/modal-services/branch.service';
import { BRANCHCONSTANTS } from 'src/app/core/utils/constants/branch.constants';
import SharedUtils from 'src/app/core/utils/shared.util';

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
export class CollectionOptionComponent implements ControlValueAccessor, OnInit, OnDestroy {
  sourceAccounts: FromAccount[];
  selected: string;
  options = Object.values(BRANCHCONSTANTS.deliveryOption)

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

  subscriptions: Subscription[] = [];

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  constructor(private readonly branchService: BranchService,) { }

  ngOnInit(): void {
    this.eventsSubscriptions();
  }

  eventsSubscriptions() {
    this.subscriptions.push(this.branchService.selectedCollectionBranch.subscribe((option: string) => {
      if (option === BRANCHCONSTANTS.deliveryOption.BRANCH) {
        this.selectedBranchSubscription();
      } else if (option === BRANCHCONSTANTS.deliveryOption.OFFICE) {

      }
    }))
  }

  selectedBranchSubscription(): void {
    this.subscriptions.push(this.branchService.selectedBranch.subscribe((branch: string) => {
      branch && this.parentForm.controls[this.fieldName].setValue(branch);
    }));
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
    this.branchService.openCollectionBranch(this.options);
  }

  ngOnDestroy() {
    SharedUtils.unSubscribe(this.subscriptions)
  }

}
