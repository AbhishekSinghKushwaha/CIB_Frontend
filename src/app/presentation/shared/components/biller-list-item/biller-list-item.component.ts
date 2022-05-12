import { BillersService } from 'src/app/core/services/modal-services/billers.service';
import { BillersModel } from './../../../../core/domain/bank.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-biller-list-item',
  templateUrl: './biller-list-item.component.html',
  styleUrls: ['./biller-list-item.component.scss']
})
export class BillerListItemComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() data: BillersModel;
  @Output() selectedBiller = new EventEmitter<BillersModel>()

  constructor(
    private readonly billService: BillersService
  ) { }

  ngOnInit() {
  }

  select(): void {
    this.billService.selectBiller(this.data)
    this.selectedBiller.emit(this.data);
  }

  generateInitials(name: string): string {
    let initials = "";

    for (let i = 0; i < name.length; i++) {
      if (name.charAt(i) === " ") {
        continue;
      }

      if (name.charAt(i) === name.charAt(i).toUpperCase()) {
        initials += name.charAt(i);

        if (initials.length === 2) {
          break;
        }
      }
    }

    return initials;
  }

}
