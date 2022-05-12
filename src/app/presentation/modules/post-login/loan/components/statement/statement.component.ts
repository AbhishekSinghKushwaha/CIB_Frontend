import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StatementDocumentComponent } from '../statement-document/statement-document.component';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss'],
})
export class StatementComponent implements OnInit {
  selectedButton: string;
  statementForm: FormGroup;

  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.statementForm = new FormGroup({
      startDate: new FormControl(null, []),
      endDate: new FormControl(null, []),
      scheduleStatement: new FormControl(null, []),
    });
  }

  setRange(button: string) {
    this.selectedButton = button;
  }

  formatDate(date: string): Date {
    return new Date(date);
  }

  submit(): void {
    this.dialog.open<StatementDocumentComponent>(
      StatementDocumentComponent,
      {}
    );
  }
}
