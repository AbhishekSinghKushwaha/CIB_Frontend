import { Component, OnInit, Input } from "@angular/core";
import { BeneficiaryModel } from "src/app/core/domain/beneficiary.model";
import { RecipientModel } from "src/app/core/domain/recipient.model";
import { FromAccount } from "src/app/core/domain/transfer.models";
import { NewRecipientService } from "src/app/core/services/modal-services/new-recipient.service";
import { TransferFromService } from "src/app/core/services/modal-services/transfer-from.service";

import { TransferToService } from "src/app/core/services/modal-services/transfer-to.service";
import { SharedDataService } from "src/app/core/services/shared-data/shared-data.service";

@Component({
  selector: "app-beneficiary-list-item",
  templateUrl: "./beneficiary-list-item.component.html",
  styleUrls: ["./beneficiary-list-item.component.scss"],
})
export class BeneficiaryListItemComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() category = "manage-favourites";
  @Input() data: any; // Update favourite model
  @Input() showCheckbox = false;

  constructor(
    private readonly sharedDataService: SharedDataService,
    private newRecipientService: NewRecipientService,
    private transferFromService: TransferFromService
  ) {}

  ngOnInit(): void {}

  selectSingle(): void {
    const recipientFormat: RecipientModel = {
      country: this.data.country,
      accountNumber: this.data.accountNumber,
      accountName: this.data.fullName,
      bank: this.data.bank,
      mobileWallet: this.data.mobileWallet,
      phoneNumber: this.data.phoneNumber,
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      IBANNumber: this.data.ibanNumber,
      streetAddress: this.data.streetAddress,
      postalAddress: this.data.postalAddress,
      telco: this.data.telcoOperator,
    };
    this.setFromAccount();
    this.newRecipientService.set(recipientFormat);
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

  setFromAccount() {
    if (this.data.fromAccount) {
      this.sharedDataService.userAccounts$.subscribe((x) => {
        const account = x.find((el: FromAccount) => {
          return el.accountNumber === this.data.fromAccount;
        });
        this.transferFromService.setTransferFromAccount(account || {});
      });
    }
  }

  selectMultiple(): void {
    // this.beneficiaryManagementModalService.select(this.data);
  }

  openBeneficiaryForm(): void {
    //TODO This has to open with a default data
    // this.beneficiaryManagementFormModalService.open();
  }
}
