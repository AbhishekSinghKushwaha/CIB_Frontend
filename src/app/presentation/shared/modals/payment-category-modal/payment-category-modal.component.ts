import { Component, OnInit } from "@angular/core";
import { Sector } from "src/app/core/domain/transfer.models";
import { SwiftModalsService } from "src/app/core/services/modal-services/swift-modals.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";

@Component({
  selector: "app-payment-category-modal",
  templateUrl: "./payment-category-modal.component.html",
  styleUrls: ["./payment-category-modal.component.scss"],
})
export class PaymentCategoryModalComponent implements OnInit {
  searchText: string;

  sectors: Sector[];

  selected: any;
  constructor(
    private readonly swiftModalsService: SwiftModalsService,
    private storageService: StorageService
  ) {
    this.selected = this.swiftModalsService.defaultPaymentCategory;

    this.swiftModalsService.selectedPaymentCategory.subscribe((x) => {
      this.selected = x;
    });
  }

  ngOnInit(): void {
    this.sectors = this.storageService.getData("sectors");
  }

  close() {
    this.swiftModalsService.closePaymentCategoryModal();
  }

  select(i: number) {
    this.selected = this.sectors[i];
    this.swiftModalsService.selectedPaymentCategory.next(this.selected);
  }
}
