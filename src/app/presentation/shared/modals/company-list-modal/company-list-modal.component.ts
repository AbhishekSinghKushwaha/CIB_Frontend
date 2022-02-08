import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyListModel } from 'src/app/core/domain/company.model';
import { CompanyListService } from 'src/app/core/services/modal-services/company-list.service';

@Component({
  selector: 'app-company-list-modal',
  templateUrl: './company-list-modal.component.html',
  styleUrls: ['./company-list-modal.component.scss']
})
export class CompanyListModalComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource<CompanyListModel>(this.ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  searchText: string;
  clickedRow: CompanyListModel | undefined;
  filter = { key: 'Name', value: 'name' };
  searchTotal = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public ELEMENT_DATA: CompanyListModel[],
    private readonly companyListService: CompanyListService) { }

  ngOnInit(): void {
    this.searchTotal = this.ELEMENT_DATA.length;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    console.log(sortState);
  }

  close() {
    this.companyListService.close();
  }

  applyFilter() {
    const newData = this.ELEMENT_DATA.filter((item: any) => item[this.filter.value].toString().toLowerCase().indexOf(this.searchText.trim().toLowerCase()) !== -1)
    this.dataSource = new MatTableDataSource<CompanyListModel>(newData);
    this.searchTotal = newData.length;
    this.clickedRow = undefined;
  }

  selectFilter(item: { value: string, key: string }) {
    this.filter = item;
  }

  clicked(row: CompanyListModel) {
    this.clickedRow = row;
  }

  select() {
    this.clickedRow && this.companyListService.close(this.clickedRow);
  }

}
