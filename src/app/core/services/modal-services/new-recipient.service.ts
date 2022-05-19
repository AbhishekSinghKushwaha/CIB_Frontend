import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { RecipientModel } from "../../domain/recipient.model";
import { NewRecipientModalComponent } from "../../../presentation/shared/modals/new-recipient-modal/new-recipient-modal.component";
import { TransactionTypeConstants } from "../../utils/constants/transaction-type.constants";
import { StorageService } from "../storage/storage.service";

@Injectable({
  providedIn: "root",
})
export class NewRecipientService {
  data = new Subject<RecipientModel>();
  dialogRef: any;
  private defaultData: RecipientModel;

  transferType = TransactionTypeConstants.TransferType;

  constructor(
    private readonly dialog: MatDialog,
    private storageService: StorageService
  ) {}

  // Open New Recipient Form Based on transaction type
  open(transactionType: string) {
    return this.dialog.open<NewRecipientModalComponent, any>(
      NewRecipientModalComponent,
      {
        maxWidth: "22vw",
        disableClose: true,
        data: transactionType,
      }
    );
  }

  // Opens the New Recipient Modal but instead of transaction Type we pass the mode of pesalink selected i.e bank or phone-linked
  openPesalinkNewRecipient(mode: string) {
    return this.dialog.open<NewRecipientModalComponent, any>(
      NewRecipientModalComponent,
      {
        maxWidth: "22vw",
        disableClose: true,
        data: mode,
      }
    );
  }

  set(input: any): void {
    this.defaultData = { ...this.defaultData, ...input };
    this.data.next(this.defaultData);
  }

  get default(): RecipientModel {
    return this.defaultData;
  }
}
