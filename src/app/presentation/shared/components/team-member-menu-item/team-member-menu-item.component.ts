import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-member-menu-item',
  templateUrl: './team-member-menu-item.component.html',
  styleUrls: ['./team-member-menu-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeamMemberMenuItemComponent implements OnInit {
  item: any;
  
  displayMenu = false;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }
  showMenu() {
    this.displayMenu = !this.displayMenu;
  }
}
