import { Component, Input, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NumberSelectModalService } from 'src/app/core/services/number-select-modal/number-select-modal.service';

@Component({
  selector: 'app-number-select-modal',
  templateUrl: './number-select-modal.component.html',
  styleUrls: ['./number-select-modal.component.scss']
})
export class NumberSelectModalComponent implements OnInit {
  selected: string;
  data: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public total: number,
    private readonly numberSelectService: NumberSelectModalService,) { }

  ngOnInit(): void {
    this.data = [...Array(this.total).keys()].map(x => ('0' + (+x + 1)).slice(-2))
  }

  close() {
    this.numberSelectService.close()
  }

  select(item: string): void {
    this.selected = item;
    this.numberSelectService.select(item);
  }
}
