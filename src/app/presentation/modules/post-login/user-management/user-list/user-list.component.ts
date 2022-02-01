import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

type UserStatus = 'enabled' | 'disabled';

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: UserStatus;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements AfterViewInit {
  private readonly users: User[] = [
    {
      id: 134312,
      name: 'Michael Scott',
      phone: '0712345678',
      email: 'scott@dmi.com',
      status: 'enabled',
    },
    {
      id: 133827,
      name: 'Jim Halpert',
      phone: '0723456789',
      email: 'j.hal@dmi.com',
      status: 'enabled',
    },
    {
      id: 381746,
      name: 'Dwight Schrute',
      phone: '0734567890',
      email: 'd.sch@dmi.com',
      status: 'enabled',
    },
    {
      id: 938273,
      name: 'Andy Benard',
      phone: '0745678901',
      email: 'a.ben@dmi.com',
      status: 'disabled',
    },
    {
      id: 291847,
      name: 'Phyllis Vance',
      phone: '0756789012',
      email: 'p.van@dmi.com',
      status: 'disabled',
    },
  ];

  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'status'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser() {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }
}
