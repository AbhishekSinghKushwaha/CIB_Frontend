import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/core/services/modal-services/branch.service';
import { BRANCHCONSTANTS } from 'src/app/core/utils/constants/branch.constants';

@Component({
  selector: 'app-branch-modal',
  templateUrl: './branch-modal.component.html',
  styleUrls: ['./branch-modal.component.scss']
})
export class BranchModalComponent implements OnInit {
  branches = BRANCHCONSTANTS.branches;
  selected: string;

  constructor(private readonly branchService: BranchService) {
    this.selected = this.branchService.defaultBranch;
    this.branchService.selectedBranch.subscribe(
      (x) => (this.selected = x)
    );
  }

  ngOnInit(): void {
  }

  close() {
    this.branchService.closeBranch()
  }

}
