import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() ToggleSideMenu = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  toggleSideMenu(): void {
    this.ToggleSideMenu.emit();
  }

  returnLogoUrl(): string {
    return `assets/images/logos/${environment.appInstance}/Primary.svg`;
  }

}
