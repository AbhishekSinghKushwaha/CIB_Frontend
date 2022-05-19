import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TransactionsService } from "src/app/core/services/transactions/transactions.service";

@Component({
  selector: "app-reason-modal",
  templateUrl: "./reason-modal.component.html",
  styleUrls: ["./reason-modal.component.scss"],
})
export class ReasonModalComponent implements OnInit {
  reasonForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private transactionService: TransactionsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.reasonForm = this.fb.group({
      reason: ["", [Validators.required]],
    });
  }

  submit() {
    this.data.remarks = this.reasonForm.controls.reason.value;
    this.transactionService.setApprovalPayload(this.data);
    this.close();
    this.router.navigate([`/transact/otp-verification/reject-transaction`]);
  }

  close() {
    this.dialog.closeAll();
  }
}
