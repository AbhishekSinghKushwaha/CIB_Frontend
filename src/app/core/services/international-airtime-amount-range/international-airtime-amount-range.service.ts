import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AirtimeAmountRangeModel } from '../../domain/international-airtime-amount-range.model';
import { InternationalAirtimeAmountRangeComponent} from 'src/app/presentation/shared/components/international-airtime-amount-range/international-airtime-amount-range.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class InternationalAirtimeAmountRangeService {

  selected = new Subject<AirtimeAmountRangeModel>();
  private data: AirtimeAmountRangeModel;
  dialogRef: any;

  constructor(private readonly dialog: MatDialog) { }

  open(data: AirtimeAmountRangeModel[] | null) {
    this.dialogRef =  this.dialog.open<InternationalAirtimeAmountRangeComponent, AirtimeAmountRangeModel[]>(InternationalAirtimeAmountRangeComponent, {
      disableClose: true,
      data
    });
    return this.dialogRef;
  } 

  select(operator: AirtimeAmountRangeModel): void {
    this.data=operator;
    this.selected.next(operator)
  }

  get default():AirtimeAmountRangeModel{
    return this.data;
  }

  close() {
    this.dialogRef.close();
  }
}
