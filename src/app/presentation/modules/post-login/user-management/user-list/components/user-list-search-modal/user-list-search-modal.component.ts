import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';
import { TransferType } from 'src/app/core/utils/constants/transaction-type.constants';
import { User } from '../../user-list.component';

@Component({
  selector: 'app-user-list-search-modal',
  templateUrl: './user-list-search-modal.component.html',
  styleUrls: ['./user-list-search-modal.component.scss'],
})
export class UserListSearchModalComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private $unsubscribe: Subject<void>;

  @ViewChild(MatSort)
  private sort: MatSort;

  private readonly EMPTY_FILTER = 'EMPTY_FILTER';

  searchForm: FormGroup;
  $searchTermPlaceholder: Observable<string>;

  displayedColumns: string[];
  filterByColumns: string[];
  title: string;

  dataSource: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);

  dictionary: Map<string,any> = new Map([ ['transferType', TransferType]]);
  
  constructor(
    private readonly dialogRef: MatDialogRef<UserListSearchModalComponent>,
    private readonly translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataSource = new MatTableDataSource<User>(data.collection);
    this.displayedColumns = data.displayedColumns;
    this.filterByColumns = data.filterByColumns
    this.title = data.title;
  }

  ngOnInit(): void {

    this.$unsubscribe = new Subject<void>();

    this.searchForm = new FormGroup({
      criteria: new FormControl(this.filterByColumns[0]),
      term: new FormControl(''),
    });

    this.$searchTermPlaceholder = this.getSearchTermObservable();

    this.dataSource.filterPredicate = this.getFilterPredicate();
    this.dataSource.filter = this.EMPTY_FILTER; // make the table empty at the beginning.
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  close(): void {
    this.dialogRef.close();
  }

  continue(): void {
    const selectedData = this.selection.selected;

    this.dialogRef.close({ selectedData });
  }

  search(): void {
    const searchCriteria = this.searchForm.controls['criteria'].value;
    const searchTerm = this.searchForm.controls['term'].value
      .trim()
      .toLowerCase();
    const searchCriteriaAndTerm = `${searchCriteria}:${searchTerm}`;

    this.dataSource.filter = searchCriteriaAndTerm;
  }

  hasSearchBeenPerformed(): boolean {
    return this.dataSource.filter !== this.EMPTY_FILTER;
  }

  clearSearch(): void {
    this.searchForm.controls['term'].setValue('');
    this.dataSource.filter = this.EMPTY_FILTER;
    this.selection.clear();
  }

  isAllSelected(): boolean {
    return (
      this.selection.selected.length === this.dataSource.filteredData.length
    );
  }

  isNothingSelected(): boolean {
    return this.selection.selected.length === 0;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.filteredData.forEach((row) => this.selection.select(row));
    }
  }

  getTranslation(key: string | unknown): string {
    return this.translateService.instant(key as string);
  }

  private getSearchTermObservable(): Observable<string> {
    const searchCriteriaControl = this.searchForm.controls['criteria'];

    return searchCriteriaControl.valueChanges.pipe(
      takeUntil(this.$unsubscribe),
      startWith(searchCriteriaControl.value),
      tap(() => this.clearSearch()),
      map((value) => {
        switch (value) {
          case 'id':
            return 'Enter their ID number';
          default:
            return 'Enter their ' + this.translateService.instant(`SEARCH_MODAL.${value.toUpperCase()}`);
        }
      })
    );
  }

  private getFilterPredicate(): (user: any, filter: string) => boolean {
    return (user: any, filter: string) => {
      const parts: string[] = filter.split(':');
      const searchCriteria: string = parts.shift() || '';
      const searchTerm: string = parts.join(':');

      if (!searchTerm) {
        return false;
      }

      if (Object.getOwnPropertyNames(user).includes(searchCriteria)) {
        const propertyValue: string = user[searchCriteria] + '';

        return propertyValue.toLowerCase().includes(searchTerm);
      }

      return false;
    };
  }
}
