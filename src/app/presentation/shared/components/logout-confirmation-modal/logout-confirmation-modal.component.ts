import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LogoutService } from 'src/app/core/services/modal-services/logout.service';

@Component({
  selector: 'app-logout-confirmation-modal',
  templateUrl: './logout-confirmation-modal.component.html',
  styleUrls: ['./logout-confirmation-modal.component.scss'],
})
export class LogoutConfirmationModalComponent {
  constructor(private logoutService: LogoutService, private authService: AuthService) { }

  logout(): void {
    this.authService.doLogout();
  }

  closeModal(): void {
    this.logoutService.closeLogoutConfirmation();
  }
}
