import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, Subject } from "rxjs";
import { BankModel, CountryModel } from "../../domain/bank.model";
import { BankModalComponent } from "../../../presentation/shared/modals/bank-modal/bank-modal.component";

@Injectable()
export class BankService {
  selected = new Subject<BankModel>();
  private data: BankModel;

  constructor(private readonly dialog: MatDialog) {}

  open(data: CountryModel) {
    return this.dialog.open<BankModalComponent, CountryModel>(
      BankModalComponent,
      {
        maxWidth: "22vw",
        disableClose: true,
        data,
      }
    );
  }

  get default(): BankModel {
    return this.data;
  }

  select(bank: BankModel): void {
    this.data = bank;
    this.selected.next(this.data);
  }
}
