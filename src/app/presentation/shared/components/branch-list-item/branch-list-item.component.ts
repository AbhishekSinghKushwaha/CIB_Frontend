import { Component, OnInit, Input } from '@angular/core';
import { BranchService } from 'src/app/core/services/modal-services/branch.service';

@Component({
  selector: 'app-branch-list-item',
  templateUrl: './branch-list-item.component.html',
  styleUrls: ['./branch-list-item.component.scss']
})
export class BranchListItemComponent implements OnInit {
  @Input() data: string;
  @Input() isChecked: boolean;

  constructor(private readonly branchService: BranchService) { }

  ngOnInit(): void {
  }

  select(): void {
    this.branchService.selectBranch(this.data);
  }

}
