import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserAdministrationService } from '../services/user-administration.service';
import { UserManagementSuccessService } from '../services/user-management-success.service';
import {
  UserListActionResult,
  UserListActionsModalComponent,
} from './components/user-list-actions-modal/user-list-actions-modal.component';
import { UserListSearchModalComponent } from './components/user-list-search-modal/user-list-search-modal.component';

export type UserStatus = 'enabled' | 'disabled' | 'pending';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: UserStatus;
  userName: string;
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
    'idNumber',
    'name',
    'phone',
    'email',
    'status',
    'actions',
  ];

  filterByColumns: string[] = [
    'idNumber',
    'name',
    'phone',
    'email'
  ]

  dataSource: MatTableDataSource<User>;

  searchControl: FormControl = new FormControl({ value: '', disabled: true });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly userManagementSuccessService: UserManagementSuccessService,
    private readonly userAdministrationService: UserAdministrationService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.userAdministrationService.getUsers().subscribe((result: any) => {
      this.users = result.items.map((element: any) => {
        return {
          id: element.userId,
          idNumber: element.idNumber,
          name: `${element.firstName} ${element.lastName}`,
          phone: element.phoneNumber,
          email: element.email,
          status: element.status,
          userName: element.userName,
          statusName: element.statusName.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")
        };
      });
      this.dataSource.data = this.users;
      console.log(result);
    });
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
        data: {
          collection: this.users,
          title: 'User search',
          copy: 'Search for a user by entering their ID number, user ID, and phone number',
          displayedColumns: [
            'select',
            'idNumber',
            'name',
            'phone',
            'email',
            'status',
          ],
          filterByColumns: this.filterByColumns
        },
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
      .subscribe((actionResult: UserListActionResult) => {
        switch (actionResult.action) {
          case 'enable':
            this.userManagementSuccessService.setBackButtonText(
              'Enable a user'
            );
            this.userAdministrationService.reviewStatus(user.id, 1).subscribe(() => {
              this.router.navigate(['success'], {
                relativeTo: this.activatedRoute,
              });
            });
            break;
          case 'disable':
            this.userManagementSuccessService.setBackButtonText(
              'Disable a user'
            );
            this.userAdministrationService
              .reviewStatus(user.id, 2, { DisableReason: actionResult.data })
              .subscribe(() => {
                this.router.navigate(['success'], {
                  relativeTo: this.activatedRoute,
                });
              });
            break;
          case 'edit':
            this.router.navigate(['edit', user.userName], {
              relativeTo: this.activatedRoute,
            });
            break;
          case 'remove':
            this.userManagementSuccessService.setBackButtonText(
              'Remove a user'
            );
            this.userAdministrationService.reviewStatus(user.id, 3).subscribe(() => {
              this.router.navigate(['success'], {
                relativeTo: this.activatedRoute,
              });
            });
            break;
        }
      });
  }
}
