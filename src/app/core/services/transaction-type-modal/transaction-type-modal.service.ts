import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { TransactionTypeModalComponent } from "src/app/presentation/shared/modals/transaction-type-modal/transaction-type-modal.component";
import { TransferTypeDTO } from "../../domain/transfer.models";

@Injectable()
export class TransferTypeModalService {
  selected = new Subject<{ key: string; value: string }>();
  private data: TransferTypeDTO;

  constructor(private readonly dialog: MatDialog) {}

  open(data: any) {
    return this.dialog.open<TransactionTypeModalComponent>(
      TransactionTypeModalComponent,
      {
        maxWidth: "22vw",
        disableClose: true,
        data,
      }
    );
  }

  get default(): TransferTypeDTO {
    return this.data;
  }

  select(type: any): void {
    this.data = type;
    this.selected.next(type);
  }
}
