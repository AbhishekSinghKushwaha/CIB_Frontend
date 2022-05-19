import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Telco } from "src/app/core/domain/transfer.models";
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class MobileOperatorsService {
  selected = new Subject<Telco>();
  private data: Telco;

  constructor() { }

  select(operator: Telco): void {
    this.data=operator;
    this.selected.next(operator)
  }

  get default():Telco{
    return this.data;
  }
}
