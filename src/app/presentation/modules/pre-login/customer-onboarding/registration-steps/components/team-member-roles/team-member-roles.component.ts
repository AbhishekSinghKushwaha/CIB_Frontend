import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  Permission,
  Role,
  TeamMember,
} from "src/app/core/domain/customer-onboarding.model";
import { TeamMembersService } from "src/app/core/services/customer-onboarding/team-members.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { RolesConstants } from "src/app/core/utils/constants/roles.constants";

@Component({
  selector: "app-team-member-roles",
  templateUrl: "./team-member-roles.component.html",
  styleUrls: ["./team-member-roles.component.scss"],
})
export class TeamMemberRolesComponent implements OnInit {
  activeRoles: any[];
  redirectTo: string;
  roles: Role[];
  memberId: any;

  constructor(
    private readonly router: Router,
    private readonly teamMembersService: TeamMembersService,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activeRoles = [];
    this.memberId = this.activatedRoute.snapshot.queryParamMap.get("id");
  }

  ngOnInit(): void {
    this.roles = this.storageService.getData("onboarding-roles");

    this.setAlreadySelectedRoles();
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

  isRoleActive(roleId: any, permissionId: any): boolean {
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

    return isActive;
  }

  saveRoles(): void {
    this.storageService.setData("selected-roles", this.activeRoles);

    this.router.navigate(
      ["/auth/customer-onboarding/register/add-team-member"],
      { queryParams: { id: this.memberId } }
    );
  }
}
