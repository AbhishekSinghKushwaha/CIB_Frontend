import { GetAllUsersUsecase } from './../../../core/usecases/get-all-users.usecase';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/core/domain/user.model';

@Component({
  selector: 'app-user-card-list',
  templateUrl: './user-card-list.component.html',
  styleUrls: ['./user-card-list.component.scss'],
})
export class UserCardListComponent implements OnInit {
  users: Array<UserModel> = [];

  constructor(private getAllUsers: GetAllUsersUsecase) {}

  ngOnInit(): void {
    this.updateUsers()
  }

  updateUsers() {
    this.users = [];
    this.getAllUsers.execute().subscribe((value: UserModel) => {
      this.users.push(value);
    });
  }
}
