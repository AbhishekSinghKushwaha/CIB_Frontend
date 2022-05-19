import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropdownModal } from 'src/app/core/domain/prompt.model';
import { SharedService } from 'src/app/core/services/shared/shared.service';

@Component({
  selector: 'app-dropdown-list-modal',
  templateUrl: './dropdown-list-modal.component.html',
  styleUrls: ['./dropdown-list-modal.component.scss']
})
export class DropdownListModalComponent<T> implements OnInit {
  selected: T;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DropdownModal<T>,
    private readonly sharedService: SharedService<T>
  ) {
  }

  ngOnInit(): void { }

  close(): void {
    this.sharedService.closeDropdown();
  }

  select(item: T) {
    this.selected = item;
    this.sharedService.closeDropdown(this.selected);
  }

}
