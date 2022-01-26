import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwiftModalsService } from 'src/app/core/services/modal-services/swift-modals.service';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';

@Component({
  selector: 'app-swift-charges-modal',
  templateUrl: './swift-charges-modal.component.html',
  styleUrls: ['./swift-charges-modal.component.scss'],
})
export class SwiftChargesModalComponent implements OnInit {
  charges = TransactionTypeConstants.SwiftChargesOptions;

  isChecked: boolean = false;
  selected: any;

  constructor(
    private dialog: MatDialog,
    private swiftModalsService: SwiftModalsService
  ) {}

  ngOnInit(): void {}

  close() {
    this.swiftModalsService.closeSwiftChargesModal();
  }

  select(i: number) {
    this.selected = this.charges[i];
    this.swiftModalsService.selectSwiftCharges(this.selected);
  }
}
