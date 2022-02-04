import { Component, OnInit } from '@angular/core';
import { SwiftModalsService } from 'src/app/core/services/modal-services/swift-modals.service';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';

@Component({
  selector: 'app-payment-category-modal',
  templateUrl: './payment-category-modal.component.html',
  styleUrls: ['./payment-category-modal.component.scss'],
})
export class PaymentCategoryModalComponent implements OnInit {
  searchText: string;

  data = TransactionTypeConstants.PaymentCategories;

  selected: any;
  constructor(private readonly swiftModalsService: SwiftModalsService) {
    this.selected = this.swiftModalsService.defaultPaymentCategory;

    this.swiftModalsService.selectedPaymentCategory.subscribe((x) => {
      this.selected = x;
    });
  }

  ngOnInit(): void {}

  close() {
    this.swiftModalsService.closePaymentCategoryModal();
  }

  select(i: number) {
    this.selected = this.data[i];
    this.swiftModalsService.selectedPaymentCategory.next(this.selected);
  }
}
