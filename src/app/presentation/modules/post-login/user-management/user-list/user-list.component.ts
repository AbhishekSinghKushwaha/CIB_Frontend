import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserManagementSuccessService } from '../services/user-management-success.service';
import {
  UserListAction,
  UserListActionsModalComponent,
} from './components/user-list-actions-modal/user-list-actions-modal.component';
import { UserListSearchModalComponent } from './components/user-list-search-modal/user-list-search-modal.component';
import { UserListService } from './services/user-list.service';

export type UserStatus = 'enabled' | 'disabled' | 'pending';

export interface User {
  id: number;
  name: string;
  phone: string;
  email?: string;
  status: UserStatus;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, AfterViewInit {
  private users: User[];

  @ViewChild(MatSort)
  private sort: MatSort;

  displayedColumns: string[] = [
    'id',
    'name',
    'phone',
    'email',
    'status',
    'actions',
  ];
  dataSource: MatTableDataSource<User>;

  searchControl: FormControl = new FormControl({ value: '', disabled: true });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly userListService: UserListService,
    private readonly userManagementSuccessService: UserManagementSuccessService
  ) {}

  ngOnInit(): void {
    this.users = this.userListService.getUserList();
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  addUser() {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  openFilterModal() {
    this.dialog
      .open<UserListSearchModalComponent>(UserListSearchModalComponent, {
        data: { users: this.users },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((filter: any) => {
        if (filter) {
          this.dataSource.data = filter.selectedData;
        } else {
          this.dataSource.data = this.users;
        }
      });
  }

  openActionsMenu(user: User): void {
    this.dialog
      .open<UserListActionsModalComponent>(UserListActionsModalComponent, {
        maxWidth: '400px',
        data: { userEnabled: user.status === 'enabled' },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((action: UserListAction) => {
        switch (action) {
          case 'enable':
            this.userManagementSuccessService.setBackButtonText(
              'Enable a user'
            );
            this.updateUserStatus(user.id, 'pending');
            break;
          case 'disable':
            this.userManagementSuccessService.setBackButtonText(
              'Disable a user'
            );
            this.updateUserStatus(user.id, 'pending');
            break;
          case 'edit':
            this.router.navigate(['edit', user.id], {
              relativeTo: this.activatedRoute,
            });
            break;
          case 'remove':
            this.userManagementSuccessService.setBackButtonText(
              'Remove a user'
            );
            this.updateUserStatus(user.id, 'pending');
            break;
        }
      });
  }

  private updateUserStatus(id: number, status: UserStatus): void {
    this.userListService.setUserStatus(id, status).subscribe(() => {
      this.router.navigate(['success'], {
        relativeTo: this.activatedRoute,
      });
    });
  }
}
