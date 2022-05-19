import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserListModel } from 'src/app/core/domain/user.model';
import { UserListService } from 'src/app/core/services/modal-services/user-list.service';
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
  private users: UserListModel[];

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

  dataSource: MatTableDataSource<UserListModel>;

  searchControl: FormControl = new FormControl({ value: '', disabled: true });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly userListService: UserListService,
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

    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  addUser() {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  openFilterModal() {
    this.userListService.open(this.users)
      .afterClosed()
      .subscribe((item: UserListModel) => {
        if (item) {
          this.dataSource.data = [item];
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
