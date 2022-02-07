import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BranchService } from 'src/app/core/services/modal-services/branch.service';
import { BRANCHCONSTANTS } from 'src/app/core/utils/constants/branch.constants';

@Component({
  selector: 'app-collection-option-modal',
  templateUrl: './collection-option-modal.component.html',
  styleUrls: ['./collection-option-modal.component.scss']
})
export class CollectionOptionModalComponent implements OnInit {
  constructor(
    private readonly branchService: BranchService,
    @Inject(MAT_DIALOG_DATA) public options: string[],
    private router: Router) { }

  ngOnInit(): void {
  }

  select(item: string) {
    if (item === BRANCHCONSTANTS.deliveryOption.BRANCH) {
      this.branchService.selectCollectionBranch(item);
      this.branchService.closeCollectionBranch();
      this.branchService.openBranch([]);
    } else {
      this.router.navigate(['/access/reset-temporary-password']);
    }
  }

  close() {
    this.branchService.closeCollectionBranch()
  }
}
