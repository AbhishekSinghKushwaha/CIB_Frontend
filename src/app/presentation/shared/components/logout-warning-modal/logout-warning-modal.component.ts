import { LogoutService } from './../../../../core/services/modal-services/logout.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-logout-warning-modal',
  templateUrl: './logout-warning-modal.component.html',
  styleUrls: ['./logout-warning-modal.component.scss'],
})
export class LogoutWarningModalComponent implements OnInit, OnDestroy {
  @Input() msTillLogout: number;
  @Output() userResponse = new EventEmitter<boolean>();
  logOut = false;
  logoutTimer: any;
  timeTillLogout: number;

  constructor(private readonly domSanitizer: DomSanitizer, private readonly logoutService: LogoutService) { }

  ngOnInit(): void {
    this.calculateLogoutTime();
  }

  ngOnDestroy(): void {
    this.userResponse.emit(this.logOut);
    clearInterval(this.logoutTimer);
  }

  createImageUrl(): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      'assets/images/Illustrations/logout-illustration.svg'
    );
  }

  returnLogoutWarning(): string {
    return $localize`:@@loco\:5f81abf84af7147cd45aeed2:You’ve been quiet. To keep your details safe, you will be automatically signed out in ${this.timeTillLogout} seconds.`;
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
    this.userResponse.emit(this.logOut);
    this.closeModal();
  }

  closeModal(): void {
    this.logoutService.closeLogoutWarning();
  }
}
