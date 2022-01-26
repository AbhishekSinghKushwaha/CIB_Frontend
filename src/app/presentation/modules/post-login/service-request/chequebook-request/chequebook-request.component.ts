import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chequebook-request',
  templateUrl: './chequebook-request.component.html',
  styleUrls: ['./chequebook-request.component.scss']
})
export class ChequebookRequestComponent implements OnInit {
  chequebookRequestForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.chequebookRequestForm = this.fb.group({
      chequeBookAccount: ['', [Validators.required]],
      chequeBookQuantity: ['', [Validators.required]],
      chequeBookLeaves: ['', [Validators.required]],
      branch: ['', [Validators.required]],
    });
  }

  submit(): void {

  }
}
