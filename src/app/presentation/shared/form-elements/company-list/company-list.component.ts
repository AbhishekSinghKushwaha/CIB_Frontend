import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UserListModel } from 'src/app/core/domain/user.model';
import { CompanyListService } from 'src/app/core/services/modal-services/company-list.service';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CompanyListComponent),
      multi: true,
    },
  ],
})
export class CompanyListComponent implements ControlValueAccessor, OnInit {
  @Input() parentForm!: FormGroup;

  @Input() public fieldName!: string;

  @Input() public label!: string;

  @Input() placeholder!: string;

  @Input() transactionType!: string;

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

  public value!: UserListModel;

  public changed!: (value: string) => void;

  public touched!: () => void;

  public isDisabled = true;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }
  constructor(
    private readonly companyListService: CompanyListService,
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

  // openModal() {
  //   this.companyListService.open(mockData.companyList)
  //     .afterClosed()
  //     .subscribe((item: UserListModel) =>
  //       this.parentForm.controls[this.fieldName].setValue(item)
  //     );
  // }
}
