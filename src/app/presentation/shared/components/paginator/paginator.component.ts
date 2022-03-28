import { Component, OnInit, Input, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { PaginationModel } from 'src/app/core/domain/pagination.model';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class PaginatorComponent implements OnInit {
  private _data: PaginationModel;
  get data(): PaginationModel {
    return this._data;
  }
  @Input() set data(value: PaginationModel) {
    this._data = value;
    this.pageSize = this.data.pageSize;
  };
  @Output() changePage = new Subject<number>();
  @Output() changeSize = new Subject<number>();
  description: string;
  currentPage = 1;
  pageSize: number;

  currentPageToggle: number;

  constructor() { }

  ngOnInit(): void {
  }

  onPageSizeChange() {
    this.pageSize && this.data.setPageSize(Number(this.pageSize))
  }

  onPageChange() {
    this.data.setCurrentPage(Number(this.currentPageToggle))
  }

}
