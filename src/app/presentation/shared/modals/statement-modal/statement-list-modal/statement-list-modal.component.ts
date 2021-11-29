import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StatementListModel } from 'src/app/core/domain/statement-list.model';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import PerfectScrollbar from 'perfect-scrollbar';
import SharedUtil from './../../../../../core/utils/shared.util';
import { NotificationModalService } from 'src/app/core/services/notification-modal/notification-modal.service';

@Component({
  selector: 'app-statement-list-modal',
  templateUrl: './statement-list-modal.component.html',
  styleUrls: ['./statement-list-modal.component.scss']
})
export class StatementListModalComponent implements OnInit {

  dataSource: MatTableDataSource<StatementListModel>;
  displayedColumns: string[] = ['transactionDate', 'valueDate', 'narrative', 'transactionReference', 'debit', 'credit', 'runningBalance'];

  constructor(
    private readonly dialogRef: MatDialogRef<StatementListModalComponent>,
    private readonly notificationModalService: NotificationModalService,
    @Inject(MAT_DIALOG_DATA) public data?: any,) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<StatementListModel>(mockData.statementList);
    const ps = new PerfectScrollbar('.listTable', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
  }

  close() {
    this.dialogRef.close(true);
  }

  sendEmail() {
    const message = SharedUtil.getNotificationModalParam({
      title: 'You\'ve got mail',
      message: 'We sent your sttement to v*******i@********.co.ke',
      buttonText: 'Dismiss'
    })
    this.notificationModalService.open(message);
  }
}
