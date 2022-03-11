import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AirtimeAmountRangeModel } from 'src/app/core/domain/international-airtime-amount-range.model';
import { InternationalAirtimeAmountRangeService } from 'src/app/core/services/international-airtime-amount-range/international-airtime-amount-range.service';
import { AirtimeMobileNumberService } from 'src/app/core/services/airtime-mobile-number/airtime-mobile-number.service';

@Component({
  selector: 'app-international-airtime-amount-range',
  templateUrl: './international-airtime-amount-range.component.html',
  styleUrls: ['./international-airtime-amount-range.component.scss']
})
export class InternationalAirtimeAmountRangeComponent implements OnInit {

  selected: AirtimeAmountRangeModel;

  constructor(
    private readonly dialogRef: MatDialogRef<InternationalAirtimeAmountRangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AirtimeAmountRangeModel[],
    private readonly internationalAirtimeAmountRangeService: InternationalAirtimeAmountRangeService,
    private readonly airtimeMobileNumberService: AirtimeMobileNumberService,
    private readonly dialog: MatDialog
  ) {
    this.selected = this.internationalAirtimeAmountRangeService.default;
    this.internationalAirtimeAmountRangeService.selected.subscribe((x) => this.selected = x);}

    ngOnInit(): void {
    }

  close(): void {
    this.dialogRef.close(true);
  }

  submit(): void {
    this.internationalAirtimeAmountRangeService.select(this.selected);
    this.dialog.closeAll();
  }
}
