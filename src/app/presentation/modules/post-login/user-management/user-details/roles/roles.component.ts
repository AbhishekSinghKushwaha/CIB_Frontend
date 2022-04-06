import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/core/domain/customer-onboarding.model';
import { DataLookupService } from 'src/app/core/services/data-lookup/data-lookup.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  memberId: any;
  roles: Role[];
  userLink: string

  constructor(
    private readonly location: Location,
    private activatedRoute: ActivatedRoute,
    private dataLookup: DataLookupService) {
    this.memberId = activatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.getRoles();
  }



  // Get roles
  getRoles() {
    this.dataLookup.getRoles().userManagement.subscribe((res: any) => {
      if (res.isSuccessful) {
        this.roles = res.data;
      }
    });
  }

}
