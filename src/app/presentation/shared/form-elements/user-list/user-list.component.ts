import { Component, forwardRef, OnInit, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserListModel } from 'src/app/core/domain/user.model';
import { UserListService } from 'src/app/core/services/modal-services/user-list.service';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import SharedUtils from 'src/app/core/utils/shared.util';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserListComponent),
      multi: true,
    },
  ],
})
export class UserListComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() parentForm!: FormGroup;

  private _defaultData: any;
  @Input() set defaultData(value: any) {
    if (value) {
      this._defaultData = value;
      this.parentForm.controls[this.fieldName].setValue(value);
    }

  };
  get defaultData() {
    return this._defaultData;
  }

  @Input() showModal: boolean;

  @Input() userListData: UserListModel[];

  @Input() public fieldName!: string;

  @Input() public label!: string;

  @Input() placeholder!: string;

  @Input() transactionType!: string;

  private subscriptions: Subscription[] = [];

  public value!: UserListModel;

  public changed!: (value: string) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }
  constructor(
    private readonly userListService: UserListService,
  ) { }

  ngOnInit(): void {
    this.eventsSubscriptions();
  }

  private eventsSubscriptions(): void {
  }

  public writeValue(value: any): void {
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
    this.subscriptions.push(this.userListService.open(this.userListData)
      .afterClosed()
      .subscribe((item: UserListModel) =>
        item && this.parentForm.controls[this.fieldName].setValue(item)
      ));
  }

  ngOnDestroy() {
    SharedUtils.unSubscribe(this.subscriptions);
  }
}
