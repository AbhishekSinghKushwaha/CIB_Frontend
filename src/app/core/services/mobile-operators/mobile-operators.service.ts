import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MobileOperatorModel } from '../../domain/mobile-operators.model';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class MobileOperatorsService {
  selected = new Subject<MobileOperatorModel>();
  private data: MobileOperatorModel;

  constructor() { }

  select(operator: MobileOperatorModel): void {
    this.data=operator;
    this.selected.next(operator)
  }

  get default():MobileOperatorModel{
    return this.data;
  }
}
