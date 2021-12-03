import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StatementDetailService } from 'src/app/core/services/statement/statement-detail/statement-detail.service';
import { StatementListService } from 'src/app/core/services/statement/statement-list/statement-list.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {
  loading: boolean;
  statementForm: FormGroup;
  selectedButton: string;
  searchText: string;

  constructor(private readonly statementDetailService: StatementDetailService,
    private readonly statementListService: StatementListService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.statementForm = new FormGroup({
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      scheduleStatement: new FormControl(null, [Validators.required]),
    });
  }

  formatDate(date: string): Date {
    return new Date(date);
  }

  setRange(button: string) {
    this.selectedButton = button
  }

  loadPDFDetail() {
    this.statementDetailService.open()
  }

  loadPDFList() {
    this.statementListService.open()
  }

  submit() {
    this.loadPDFList()
  }
}
