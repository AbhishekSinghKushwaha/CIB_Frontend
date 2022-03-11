import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AddBeneficiaryModel } from 'src/app/core/domain/add-beneficiary.model';
import { AddBeneficiaryService } from 'src/app/core/services/add-beneficiary/add-beneficiary.service';
import { BeneficiaryAddedService } from 'src/app/core/services/beneficiary-added/beneficiary-added.service';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.scss']
})
export class AddBeneficiaryComponent implements OnInit {

  equityForm: FormGroup;
  data: AddBeneficiaryModel;
  visibility = true;

  constructor(
    readonly dialogRef: MatDialogRef<AddBeneficiaryComponent>,
    private readonly addBeneficiaryService: AddBeneficiaryService,
    private readonly beneficiaryAddedService: BeneficiaryAddedService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.equityForm = new FormGroup({
      name: new FormControl(this.data?.name, [Validators.required]),
    });
  }

  close(): void {
    this.dialogRef.close(true);
  }

  submit(): void {
    this.addBeneficiaryService.set(this.equityForm.value);
    // this.addMerchantService.close();
    const modal = this.beneficiaryAddedService.open();
    this.visibility = false;
    modal.afterClosed().subscribe(() => {
      this.visibility = true;
    });
  }

}
