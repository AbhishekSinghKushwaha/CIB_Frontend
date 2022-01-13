import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FixedRangeModel } from 'src/app/core/domain/fixed-range.model';
import { FixedRangeService } from 'src/app/core/services/fixed-range/fixed-range.service';

@Component({
  selector: 'app-fixed-range',
  templateUrl: './fixed-range.component.html',
  styleUrls: ['./fixed-range.component.scss']
})
export class FixedRangeComponent implements OnInit {

  selected: FixedRangeModel;

  constructor(
    private readonly dialogRef: MatDialogRef<FixedRangeComponent>,
    private readonly fixedRangeService: FixedRangeService,
    @Inject(MAT_DIALOG_DATA) public data: FixedRangeModel[],
  ) {
    this.selected = this.fixedRangeService.default;
    this.fixedRangeService.selected.subscribe((x) => this.selected = x);
   }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }

}
