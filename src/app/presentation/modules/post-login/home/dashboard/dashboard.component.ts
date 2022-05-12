import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  fullUsername: string;
  username: string;
  initials: string;
  userData: any;

  constructor(
    private storageService: StorageService) { }

  ngOnInit(): void {

    this.userData = this.storageService.getData('user_data');
    this.fullUsername = this.userData.corporateName ? this.userData.corporateName : this.userData.firstName + ' ' + this.userData.lastName;
    this.username = this.userData.userName ? this.userData.userName : this.userData.emailAddress;
    this.initials = this.generateInitials(this.fullUsername);
  }

  generateInitials(name: string): string {
    let initials = '';

    for (let i = 0; i < name.length; i++) {
      if (name.charAt(i) === ' ') {
        continue;
      }

      if (name.charAt(i) === name.charAt(i).toUpperCase()) {
        initials += name.charAt(i);

        if (initials.length === 2) {
          break;
        }
      }
    }

    return initials;
  }

}
