import { LogoutService } from './../../../../core/services/modal-services/logout.service';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { SharedUtils } from 'src/app/core/utils/shared.util';

@Component({
  selector: 'app-logout-warning-modal',
  templateUrl: './logout-warning-modal.component.html',
  styleUrls: ['./logout-warning-modal.component.scss'],
})
export class LogoutWarningModalComponent implements OnInit, OnDestroy {
  logOut = false;
  @Input() msTillLogout: number;
  logoutTimer: any;
  timeTillLogout: number;
  logoutResponse = new Subject<boolean>();

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly logoutService: LogoutService,
    private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.calculateLogoutTime();
  }

  createImageUrl(): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      'assets/images/Illustrations/logout-illustration.svg'
    );
  }

  returnLogoutWarning(): string {
    return `You've been quiet. To keep your details safe, you will be automatically signed out in ${SharedUtils.formatSeconds(this.timeTillLogout)} seconds.`;
  }

  calculateLogoutTime(): void {
    if (!this.timeTillLogout) {
      this.timeTillLogout = this.msTillLogout / 1000;
    }
    this.logoutTimer = setInterval(() => {
      this.timeTillLogout--;
    }, 1000);
  }

  logoutNow(): void {
    this.logOut = true;
    this.authService.doLogout();
    this.closeModal();
  }

  closeModal(): void {
    this.logoutService.closeLogoutWarning(this.logOut);
  }

  ngOnDestroy(): void {
    clearInterval(this.logoutTimer);
  }
}
