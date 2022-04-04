import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission, Role } from 'src/app/core/domain/customer-onboarding.model';
import { TeamMembersService } from 'src/app/core/services/customer-onboarding/team-members.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-corporate-user-roles',
  templateUrl: './corporate-user-roles.component.html',
  styleUrls: ['./corporate-user-roles.component.scss']
})
export class CorporateUserRolesComponent implements OnInit {
  activeRoles: any[];
  redirectTo: string;
  selectedMainRole: string;

  @Input() backLink: any;
  @Input() memberId: any;
  private _roles: Role[];
  @Input() set roles(input: Role[]) {
    this._roles = input;
    console.log(input);
    this.setAlreadySelectedRoles();
  };
  get roles(): Role[] {
    return this._roles;
  }

  constructor(
    private readonly router: Router,
    private readonly teamMembersService: TeamMembersService,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.activeRoles = [];
  }

  ngOnInit(): void {
  }

  setAlreadySelectedRoles() {
    const roles = this.storageService.getData("selected-roles");
    if (this.activeRoles.length === 0 && roles !== null) {
      this.activeRoles = roles;
    } else {
      this.activeRoles = [];
    }
  }

  toggle(roleId: any, permissionId: any): void {
    const selectedRole = this.activeRoles?.find((role) => {
      return role.id === roleId;
    });

    const role = this.roles.find((role) => {
      return role.id === roleId;
    });

    const permission = role?.permissions.find((permission: Permission) => {
      return permission.id === permissionId;
    });

    if (selectedRole) {
      const selectedPermission = selectedRole?.permissions.find(
        (permission: Permission) => {
          return permission.id === permissionId;
        }
      );

      const selectedRoleIndex = this.activeRoles.findIndex((role) => {
        return role.id === roleId;
      });

      if (selectedPermission) {
        const selectedPermissionIndex = selectedRole.permissions.findIndex(
          (permission: Permission) => permission.id === permissionId
        );

        selectedRole.permissions.splice(selectedPermissionIndex, 1);

        if (selectedRole.permissions.length === 0) {
          this.activeRoles.splice(selectedRoleIndex, 1);
        } else {
          this.activeRoles[selectedRoleIndex] = selectedRole;
        }
      } else {
        selectedRole.permissions.push(permission);

        this.activeRoles[selectedRoleIndex] = selectedRole;
      }
    } else {
      this.activeRoles.push({
        ...role,
        ...{ permissions: [permission] },
      });
    }
  }

  isParentRoleActive(roleId: any): boolean {
    return true;
  }

  mainRoleChange(event: any) {
    if (event.value) {
      this.activeRoles = this.activeRoles.filter(x => x.description === event.value)
    }
  }

  isRoleActive(roleId: any, permissionId: any, mainSelected = false): boolean {
    const selectedRole = this.activeRoles?.find((role) => {
      return role.id === roleId;
    });

    let isActive: boolean = false;
    if (selectedRole) {
      const selectedPermission = selectedRole.permissions.find(
        (permission: any) => {
          return permission.id === permissionId;
        }
      );

      if (selectedPermission) {
        isActive = true;
      }
    }
    if (!mainSelected) {
      isActive = false;
    }

    return isActive;
  }

  saveRoles(): void {
    this.storageService.setData("selected-roles", this.activeRoles);

    this.location.back();
  }
}