import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { animate, group, style, transition, trigger } from '@angular/animations';
import * as  _ from 'lodash';
import { BeneficiaryModel } from 'src/app/core/domain/beneficiary.model';
import { BeneficiaryActionResultType, BeneficiaryManagementService } from 'src/app/core/services/beneficiary-management/beneficiary-management.service';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog/confirm-dialog.service';
import { confirmModal } from 'src/app/presentation/shared/decorators/confirm-dialog.decorator';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';
@Component({
  selector: 'app-beneficiary-management',
  templateUrl: './beneficiary-management.component.html',
  styleUrls: ['./beneficiary-management.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({ transform: 'translateX(-50%)' }),
        animate(400)
      ]),
      transition(':leave', [
        animate(
          '0.5s ease-in-out',
          style({
            transform: 'translate(50%)',
            opacity: 0.5
          })
        ),
      ])
    ])
  ]
})
export class BeneficiaryManagementComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'transactionType', 'accountNumber', 'bank', 'edit'];
  dataSource = new MatTableDataSource<BeneficiaryModel>([]);
  beneficiaries: BeneficiaryModel[] = [];
  selection = new SelectionModel<BeneficiaryModel>(true, []);
  alertVisible: boolean;
  alertMessage: string | undefined;
  loaded: boolean;

  constructor(
    private readonly beneficiaryManagementService: BeneficiaryManagementService,
    private readonly dialogService: ConfirmDialogService,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.subscribeEvents();
    this.loadBeneficiaries();
    this.cleanEditData();
  }

  subscribeEvents(): void {
    this.beneficiaryManagementService.formData.subscribe(value => {
      this.loaded = true;
      this.showAlert(value.type);
      this.beneficiaries = value.data;
      this.dataSource = new MatTableDataSource<BeneficiaryModel>(this.beneficiaries);
    })

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  showAlert(type: BeneficiaryActionResultType): void {

    const messages: {type:BeneficiaryActionResultType, message:string}[] = [
                      {type: BeneficiaryActionResultType.ADD, message: 'Your beneficiary has been added successfully'},
                      {type: BeneficiaryActionResultType.DELETE, message: 'Your beneficiary has been removed successfully'},
                      {type: BeneficiaryActionResultType.EDIT, message: 'Your beneficiary has been edited successfully'}
                    ]

    if (this.alertVisible) {
      return;
    }

    this.alertMessage = messages.find( (item) => item.type === type)?.message;
    
    if (!!this.alertMessage) {
      this.alertVisible = true;
      setTimeout(() => this.alertVisible = false, 2500)
    }
  }

  closeAlert() {
    this.alertVisible = false;
  }

  edit(deleteMode: boolean, data: BeneficiaryModel, index: number) {
    if (deleteMode) {
      this.deleteBeneficiary([data]);
    } else {
      this.beneficiaryManagementService.beneficiaryEdit = data;
      this.router.navigate([`/transact/beneficiary-management/edit/${index + 1}`]);
    }
  }

  @confirmModal({
    title: 'Are you sure',
    message: 'Once you remove a beneficiary, all their details will be deleted. You can add them again anytime.',
    cancelText: 'No, I\'m not',
    confirmText: 'Yes, I\'m sure'
  })
  deleteBeneficiary(data: BeneficiaryModel[]) {
    data.forEach((selected) => {
      this.dataSource.data = this.dataSource.data
        .filter((value) => !_.isEqual(value, selected));
      selected && this.selection.deselect(selected);
      this.beneficiaryManagementService.deleteById(selected.id as number);
    });
    this.beneficiaryManagementService.beneficiaries = this.dataSource.data;
    
  }
  getTransactionTypeLabel(id: number): string | undefined{
    return TransactionTypeConstants.TRANSACT_TYPE.find( (item) => item.id === id )?.name;
  }
  loadBeneficiaries(): void {
    this.beneficiaryManagementService.getAll();
  }
  cleanEditData(): void {
    this.beneficiaryManagementService.beneficiaryEdit = null;
  }
}
