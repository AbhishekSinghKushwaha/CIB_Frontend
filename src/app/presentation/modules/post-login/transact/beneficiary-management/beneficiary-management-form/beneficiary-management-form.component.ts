import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BeneficiaryModel } from 'src/app/core/domain/beneficiary.model';
import { BankService } from 'src/app/core/services/modal-services/bank.service';
import { BeneficiaryManagementService } from 'src/app/core/services/beneficiary-management/beneficiary-management.service';
import { TransferTypeModalService } from 'src/app/core/services/transaction-type-modal/transaction-type-modal.service';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { SharedUtils } from 'src/app/core/utils/shared.util';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';
import { BeneficiaryManagementFieldService } from 'src/app/core/services/beneficiary-management-field/beneficiary-management-field.service';
import { BeneficiaryField, BeneficiaryTypeFieldsDict } from 'src/app/core/utils/constants/beneficiary-fields.constants';
import { CountryService } from 'src/app/core/services/modal-services/country.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { countrySettings } from "src/app/core/utils/constants/country.settings";
import { MobileOperatorService } from 'src/app/core/services/modal-services/mobile-operator.service';
import { TransferFromService } from 'src/app/core/services/modal-services/transfer-from.service';
import { SharedDataService } from 'src/app/core/services/shared-data/shared-data.service';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-beneficiary-management-form',
  templateUrl: './beneficiary-management-form.component.html',
  styleUrls: ['./beneficiary-management-form.component.scss'],
})
export class BeneficiaryManagementFormComponent implements OnInit {
  equityForm: FormGroup;
  visibility = true;
  editMode: boolean;
  id: number;
  editData: BeneficiaryModel | undefined;
  fields: BeneficiaryField[] | undefined;
  userAccounts: FromAccount[];
  subscriptions: Subscription[] = [];
  @Input() modalMode = false;
  private _modalData: BeneficiaryModel;
  @Input()
  set modalData(value: BeneficiaryModel) {
    this._modalData = value;
    this.editData = value;
    this.initForm();
  }
  get modalData(): BeneficiaryModel {
    return this._modalData;
  }
  @Output() formSubmitted = new Subject<BeneficiaryModel>();

  constructor(
    private readonly storageService: StorageService,
    private readonly bankService: BankService,
    private readonly countryService: CountryService,
    private readonly transactionTypeModalService: TransferTypeModalService,
    private readonly beneficiaryManagementService: BeneficiaryManagementService,
    private readonly beneficiaryFieldService: BeneficiaryManagementFieldService,
    private readonly mobileOperatorService: MobileOperatorService,    
    private readonly transferFromAccountService: TransferFromService,
    private readonly sharedDataService: SharedDataService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formMode();
    this.getEditData();
    this.initForm();
    this.populateForm();
    this.eventsSubscriptions();
  }

  formMode(): void {
    this.id = +this.route.snapshot.params['id'];
    this.editMode = !!this.id;
  }

  getEditData() {
    if (this.beneficiaryManagementService.beneficiaryEdit) {
      this.editData = this.beneficiaryManagementService.beneficiaryEdit;
    } else {
      const sub = this.beneficiaryManagementService.formData.pipe(take(1)).subscribe(
        (beneficiaryList) => {
          this.editData = beneficiaryList.data.find( (item) => item.id === this.id);
        })      
      this.beneficiaryManagementService.getAll()
    }
  }

  private eventsSubscriptions(): void {

    this.subscriptions.push(
      this.transactionTypeModalService.selected.subscribe((response) => {
        this.equityForm.controls.transferType.setValue(response.value);
        this.populateForm();
      })
    );

    this.subscriptions.push(
      this.bankService.selected.subscribe((response) => {
        this.equityForm.controls.bank.setValue(response);
      })
    );
    
    this.subscriptions.push(
      this.countryService.selectedCountry.subscribe((response) => {
        this.equityForm.get('country')?.setValue(response);
      })
    );
    
    this.subscriptions.push(
      this.transferFromAccountService.selectedTransferFromAccount.subscribe((response) => {
        this.equityForm.get('fromAccount')?.setValue(response);
      })
    );

    this.subscriptions.push(
      this.sharedDataService.userAccounts.subscribe((res) => {
        this.userAccounts = res;
      })
    );
  }

  private initForm(): void {
    this.equityForm = new FormGroup({
      id: new FormControl(this.editData?.id),
      favourite: new FormControl(this.editData?.favourite || false),
      transferType: new FormControl(this.editData?.transferType || "2", [Validators.required]),    
      country: new FormControl(this.editData?.country)
    });
    if (this.editData?.favourite) {
      this.addFromAccountControl();
    }
  }

  private populateForm(): void {
    this.clearForm();
    this.fields = BeneficiaryTypeFieldsDict.get(this.equityForm.controls.transferType.value.toString());
    this.fields?.find( (field) => field.fieldType==="bank") ? this.beneficiaryFieldService.assignClickAction(this.fields, "bank", this.openBanks.bind(this)) : null;
    this.fields?.find( (field) => field.fieldType==="country") ? this.beneficiaryFieldService.assignClickAction(this.fields, "country", this.openCountry.bind(this)) : null;
    this.fields?.find( (field) => field.fieldType==="mobileOperator") ? this.beneficiaryFieldService.assignClickAction(this.fields, "mobileOperator", this.openOperator.bind(this)) : null;

    this.fields?.forEach( (field) => {
      if (field.metadata.required) {
        this.equityForm.addControl(field.fieldType, new FormControl(this.editData ? this.editData[field.fieldType] : '', Validators.required))
      } else {
        this.equityForm.addControl(field.fieldType, new FormControl(this.editData ? this.editData[field.fieldType] : ''))
      }
    }) 
  }

  private clearForm(): void {
    this.beneficiaryFieldService.clearAllClickActions();
    Object.keys(this.equityForm.controls).forEach( (key) => {
      if (key!=='id' && key!=='transferType' && key!=='favourite' && key!=='fromAccount') {
        this.equityForm.removeControl(key);
      }
    })
  }

  submit() {
    console.log({ editMode: this.editMode, modalMode: this.modalMode,form: this.equityForm.value, controls:  this.equityForm.controls });
    if (!this.editMode) {
      if (this.modalMode) {
        this.formSubmitted.next(this.equityForm.value);
      } else {
        this.beneficiaryManagementService.submitForm(this.equityForm.value);
        this.router.navigate(['/transact/beneficiary-management']);
      }
    } else {
      if (this.modalMode) {
        this.formSubmitted.next({ ...this.equityForm.value, id: this.id });
      } else {
        this.beneficiaryManagementService.updateForm(
          this.equityForm.value,
          this.id
        );
        this.router.navigate(['/transact/beneficiary-management']);
      }
    }
  }

  openBanks() {
    const modal = this.bankService.open(mockData.banks);
    if (this.modalMode) {
      this.visibility = false;
      modal.afterClosed().subscribe(() => {
        this.visibility = true;
      });
    }
  }

  openCountry() {    
    const modal = this.countryService.openCountry(
      this.storageService.getData("countries"),
      countrySettings.viewTypes.NAME_ONLY,
      {}
    );
    if (this.modalMode) {
      this.visibility = false;
      modal.afterClosed().subscribe(() => {
        this.visibility = true;
      });
    }
  }

  openOperator() {
    const hideRecipient = true;
    const modal = this.mobileOperatorService.open(
      this.equityForm.get('mobileOperator')?.value,
      hideRecipient
    );
    if (this.modalMode) {
      this.visibility = false;
      modal.afterClosed().subscribe(() => {
        this.visibility = true;
      });
    }}

  openTransactions() {
    const modal = this.transactionTypeModalService.open(
      TransactionTypeConstants.TransferType
    );
    if (this.modalMode) {
      this.visibility = false;
      modal.afterClosed().subscribe(() => {
        this.visibility = true;
      });
    }
  }

  openAccounts() {
    const modal = this.transferFromAccountService.openTransferFromModal(
      this.userAccounts
    );
    if (this.modalMode) {
      this.visibility = false;
      modal.afterClosed().subscribe(() => {
        this.visibility = true;
      });
    }

  }

  addFromAccountControl(): void {
    this.equityForm.addControl('fromAccount', new FormControl(this.editData ? this.editData.fromAccount : '', Validators.required))
  }
  removeFromAccountControl(): void {
    this.equityForm.removeControl('fromAccount');
  }

  toggleFav(): void {
    this.equityForm.get('favourite')?.setValue(!this.equityForm.get('favourite')?.value);

    if (this.equityForm.get('favourite')?.value) {
      this.addFromAccountControl();
    } else {
      this.removeFromAccountControl();
    }
    //this.equityForm.get('fromAccount')?.setValue(null)
  }

  getFieldValue(controlName: string, property: string | undefined): string {
    if (!property)
      return "";
      const ctr = this.equityForm.get(controlName);
      
    return ctr && ctr.value ? ctr.value[property] : '';
  }

  ngOnDestroy(): void {
    this.equityForm.reset();
    SharedUtils.unSubscribe(this.subscriptions);
  }
}
