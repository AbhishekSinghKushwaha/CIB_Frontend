import { Component, OnInit } from '@angular/core';
import { UserManagementSuccessService } from '../services/user-management-success.service';

@Component({
  selector: 'app-user-management-success',
  templateUrl: './user-management-success.component.html',
  styleUrls: ['./user-management-success.component.scss'],
})
export class UserManagementSuccessComponent implements OnInit {
  backButtonText: string;

  constructor(
    private readonly userManagementSuccessService: UserManagementSuccessService
  ) {}

  ngOnInit(): void {
    this.backButtonText = this.userManagementSuccessService.getBackButtonText();
  }
}
