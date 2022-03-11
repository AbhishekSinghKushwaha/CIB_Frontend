import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FixedRangeComponent } from 'src/app/presentation/shared/modals/fixed-range/fixed-range.component';
import { FixedRangeModel } from 'src/app/core/domain/fixed-range.model';

@Injectable({
  providedIn: 'root'
})
export class FixedRangeService {

  selected = new Subject<FixedRangeModel>();
  private data:FixedRangeModel;

  constructor(private readonly dialog: MatDialog) { }

  open(data: FixedRangeModel[]): void {
    this.dialog.open<FixedRangeComponent, FixedRangeModel[]>(FixedRangeComponent, {
      disableClose: true,
      data
    });
  }

  get default():FixedRangeModel{
    return this.data;
  }

  select(currency: FixedRangeModel): void {
    this.data=currency;
    this.selected.next(currency)
  }
}
