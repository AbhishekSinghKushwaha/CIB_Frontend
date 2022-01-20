import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesConstants } from 'src/app/core/utils/constants/roles.constants';

@Component({
  selector: 'app-roles',
  templateUrl: './team-members-roles.component.html',
  styleUrls: ['./team-members-roles.component.scss']
})
export class TeamMembersRolesComponent implements OnInit {
  activeRoles:string[];
  redirectTo:string;

  constructor(public readonly roleList: RolesConstants, 
    private readonly router:Router, 
    private readonly activeRoute: ActivatedRoute) {
    this.activeRoles = [];
   }

  ngOnInit(): void {
    this.redirectTo = this.activeRoute.snapshot.data.redirectTo;
  }

  toggle(roleId: string): void {
    if (this.isRoleActive(roleId)) {
      this.activeRoles.splice(this.activeRoles.findIndex((index) => roleId == index),1);
    } else {
      this.activeRoles.push(roleId);
    }
  }
  
  isRoleActive(roleId: string): boolean {
    return this.activeRoles.indexOf(roleId) > -1;
  }

  save(): void {
    this.goBack();
  }

  goBack(): void {
    this.router.navigate([this.redirectTo]);
  }

}
