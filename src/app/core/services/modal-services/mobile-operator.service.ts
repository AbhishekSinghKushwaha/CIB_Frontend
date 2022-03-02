import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MobileOperatorsModalComponent } from "src/app/presentation/shared/modals/new-recipient-modal/mobile-operators-modal/mobile-operators-modal.component";
import { MobileOperator } from "../../domain/transfer.models";

@Injectable()
export class MobileOperatorService {
  selected = new Subject<MobileOperator>();
  openedStatus = new Subject<boolean>();
  operatorData: MobileOperator;
  mobileOperatorModalRef: MatDialogRef<MobileOperatorsModalComponent, any>;

  constructor(private readonly dialog: MatDialog) {}

  open(defaultOperator: MobileOperator, hideRecipient: boolean) {
    this.openedStatus.next(true);
    this.mobileOperatorModalRef = this.dialog.open<MobileOperatorsModalComponent, any>(
      MobileOperatorsModalComponent,
      { data: { 
        defaultOperator:defaultOperator,
        hideRecipient: hideRecipient
      }}
    );
    return this.mobileOperatorModalRef;
  }

  get defaultOperator(): MobileOperator {
    return this.operatorData;
  }

  selectOperator(oeprator: MobileOperator): void {
    this.operatorData = oeprator;
    this.selected.next(this.operatorData);
  }

  closeMobileOperatorModal(data: MobileOperator): void {
    this.selectOperator(data);
    this.mobileOperatorModalRef.close(data);
  }
}
