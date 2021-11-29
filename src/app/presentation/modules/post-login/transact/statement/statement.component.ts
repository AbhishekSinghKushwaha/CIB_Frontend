import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {
  loading: boolean;
  statementForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,) { }

  ngOnInit(): void {
  }

  private initForm(): void {
    this.statementForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      scheduleStatement: ['', [Validators.required]],
    });
  }

  submit() {

  }
}
