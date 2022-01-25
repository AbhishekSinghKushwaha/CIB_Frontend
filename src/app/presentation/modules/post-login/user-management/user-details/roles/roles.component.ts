import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RoleEditorService } from 'src/app/core/services/role-editor/role-editor.service';
import { RolesConstants } from 'src/app/core/utils/constants/roles.constants';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  activeRoles:string[];
  redirectTo:string;

  constructor(public readonly roleList: RolesConstants, 
    private readonly roleService: RoleEditorService, 
    private readonly location: Location) {
    this.activeRoles = [];
   }

  ngOnInit(): void {
    this.roleService.selected.subscribe( (value: string[]) => {
      this.activeRoles = value;
    })
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
    this.roleService.save(this.activeRoles);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

}
