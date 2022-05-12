import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ReasonModalComponent } from "src/app/presentation/shared/modals/reason-modal/reason-modal.component";

@Injectable({
  providedIn: "root",
})
export class ReasonModalService {
  constructor(private readonly dialog: MatDialog) {}

  open(reasonPayload: any) {
    return this.dialog.open<ReasonModalComponent, any>(ReasonModalComponent, {
      maxWidth: "22vw",
      disableClose: true,
      data: reasonPayload,
    });
  }
}
