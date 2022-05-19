import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserListModel } from 'src/app/core/domain/user.model';
import { UserListService } from 'src/app/core/services/modal-services/user-list.service';

@Component({
  selector: 'app-user-list-modal',
  templateUrl: './user-list-modal.component.html',
  styleUrls: ['./user-list-modal.component.scss']
})
export class UserListModalComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idNumber', 'name', 'profileType', 'status', 'lastViewed'];
  dataSource = new MatTableDataSource<UserListModel>(this.ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  searchText: string;
  clickedRow: UserListModel | undefined;
  filter = { key: 'ID Number', value: 'idNumber' };
  searchTotal = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public ELEMENT_DATA: UserListModel[],
    private readonly userListService: UserListService) { }

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
    this.userListService.close();
  }

  applyFilter() {
    const newData = this.ELEMENT_DATA.filter((item: any) => item[this.filter.value].toString().toLowerCase().indexOf(this.searchText.trim().toLowerCase()) !== -1)
    this.dataSource = new MatTableDataSource<UserListModel>(newData);
    this.searchTotal = newData.length;
    this.clickedRow = undefined;
  }

  selectFilter(item: { value: string, key: string }) {
    this.filter = item;
  }

  clicked(row: UserListModel) {
    this.clickedRow = row;
  }

  select() {
    this.clickedRow && this.userListService.close(this.clickedRow);
  }

}
