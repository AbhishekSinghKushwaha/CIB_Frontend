import { Component, Input, OnInit } from '@angular/core';
import { FixedRangeModel } from 'src/app/core/domain/fixed-range.model';
import { FixedRangeService } from 'src/app/core/services/fixed-range/fixed-range.service';

@Component({
  selector: 'app-fixed-range-list',
  templateUrl: './fixed-range-list.component.html',
  styleUrls: ['./fixed-range-list.component.scss']
})
export class FixedRangeListComponent implements OnInit {

  @Input() data:FixedRangeModel;
  @Input() isChecked: boolean;

  constructor(
    private readonly fixedRangeService: FixedRangeService
  ) { }

  ngOnInit(): void {
  }

  select(): void {
    this.fixedRangeService.select(this.data);
  }

}
