import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { confirmModal } from '../../shared/decorators/confirm-dialog.decorator';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() ToggleSideMenu = new EventEmitter();
  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void { }

  toggleSideMenu(): void {
    this.ToggleSideMenu.emit();
  }

  returnLogoUrl(): string {
    return `assets/images/logos/${environment.appInstance}/Primary.svg`;
  }

  @confirmModal({
    title: 'Are you sure you want to signout',
    message: '',
    cancelText: 'Keep me in',
    confirmText: 'Sign me out',
  })
  logout() {
    this.authService.doLogout()
  }
}
