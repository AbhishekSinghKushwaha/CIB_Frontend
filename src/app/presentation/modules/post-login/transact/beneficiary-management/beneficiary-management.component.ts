import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { animate, group, style, transition, trigger } from '@angular/animations';
import { BeneficiaryModel } from 'src/app/core/domain/beneficiary.model';
import { BeneficiaryManagementService } from 'src/app/core/services/beneficiary-management/beneficiary-management.service';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog/confirm-dialog.service';
import { confirmModal } from 'src/app/presentation/shared/decorators/confirm-dialog.decorator';

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
  beneficiaries: BeneficiaryModel[];
  selection = new SelectionModel<BeneficiaryModel>(true, []);
  alertVisible: boolean;
  alertMessage: string;

  constructor(
    private readonly beneficiaryManagementService: BeneficiaryManagementService,
    private readonly dialogService: ConfirmDialogService,
    private readonly router: Router) {
    this.subscribeEvents();
  }

  ngOnInit(): void {
    this.loadBeneficiaries();
  }

  subscribeEvents(): void {
    this.beneficiaryManagementService.formData.subscribe(value => {
      this.showAlert('Your beneficiary has been added successfully');
      this.beneficiaries = [...this.beneficiaries, ...value];
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

  showAlert(message: string): void {
    if (this.alertVisible) {
      return;
    }
    this.alertVisible = true;
    this.alertMessage = message;
    setTimeout(() => this.alertVisible = false, 2500)
  }

  closeAlert() {
    this.alertVisible = false;
  }

  edit(deleteMode: boolean, data: BeneficiaryModel, index: number) {
    console.log(data, index);
    if (deleteMode) {
      this.deleteBeneficiary(index);
    } else {
      this.beneficiaryManagementService.beneficiaryEdit = data;
      this.router.navigate([`/transact/beneficiary-management/edit/${index + 1}`]);
    }
  }

  @confirmModal({
    title: 'CONFIRM.DOWNLOAD.JOB.TITLE',
    message: 'CONFIRM.DOWNLOAD.JOB.MESSAGE',
    cancelText: 'CONFIRM.DOWNLOAD.JOB.CANCELTEXT',
    confirmText: 'CONFIRM.DOWNLOAD.JOB.CONFIRMTEXT'
  })
  deleteBeneficiary(index: any = null) {
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
    };
  }

  loadBeneficiaries() {
    this.beneficiaries = [];
  }
}
