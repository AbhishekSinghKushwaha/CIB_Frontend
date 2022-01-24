import { Component, Input, OnInit } from '@angular/core';
import { TransferToService } from 'src/app/core/services/modal-services/transfer-to.service';
import { NewRecipientService } from 'src/app/core/services/modal-services/new-recipient.service';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';

export interface purposeText {
  heading?: string;
  subheading?: string;
  navigationHeading?: string;
  navigationSubheading?: string;
  navigationIcon?: string;
}
@Component({
  selector: 'app-send-or-pay-to',
  templateUrl: './send-or-pay-to.component.html',
  styleUrls: ['./send-or-pay-to.component.scss'],
})
export class SendOrPayToComponent implements OnInit {
  visibility: boolean = false;
  searchText: string;

  @Input() favourites: any[];

  @Input() transactionType: string;

  selectedFavourite: any;

  purposeText: purposeText = {};

  transferType = TransactionTypeConstants.TransferType;
  constructor(
    private readonly transferToService: TransferToService,
    private readonly newRecipientService: NewRecipientService
  ) {
    this.selectedFavourite = transferToService.defaultFavourite;
    this.transferToService.selectedFavourite.subscribe(
      (x) => (this.selectedFavourite = x)
    );
  }

  ngOnInit(): void {
    console.log();
    this.visibility = true;
    this.formatPurposeText();
  }

  openBeneficiaryManagementModal() {}

  openNewRecipient(): void {
    const modal = this.newRecipientService.open(this.transactionType);
    this.visibility = false;
    modal.afterClosed().subscribe(() => {
      this.visibility = true;
    });
  }

  resetBeneficiaries(): void {
    this.searchText = '';
  }

  formatPurposeText() {
    if (
      this.transactionType === this.transferType.INTRA_BANK ||
      this.transactionType === this.transferType.INTER_BANK ||
      this.transactionType === this.transferType.MOBILE_MONEY ||
      this.transactionType === this.transferType.RTGS ||
      this.transactionType === this.transferType.EFT ||
      this.transactionType === this.transferType.SWIFT
    ) {
      this.purposeText.heading = 'Send To';
      this.purposeText.subheading = 'Who are you sending money to?';
      this.purposeText.navigationHeading = 'Send to someone new';
      this.purposeText.navigationSubheading = `Enter account details`;
      this.purposeText.navigationIcon =
        './assets/images/icons/Visual support_Icon_with_container.svg';
    } else if (this.transactionType === this.transferType.BUY_GOODS) {
      this.purposeText.heading = 'Pay To';
      this.purposeText.subheading = 'Please select a merchant';
      this.purposeText.navigationHeading = 'Till number';
      this.purposeText.navigationSubheading = `Enter merchant's till number`;
      this.purposeText.navigationIcon =
        './assets/images/icons/visual-support-icon-till.svg';
    } else if (this.transactionType === this.transferType.PESALINK) {
      this.purposeText.heading = 'Send To';
      this.purposeText.subheading = 'Who are you sending money to?';
      this.purposeText.navigationHeading = 'Send to a bank account';
      this.purposeText.navigationSubheading = `Enter account details`;
      this.purposeText.navigationIcon =
        './assets/images/icons/visual-support-icon-other-bank.svg';
    }
  }
}
