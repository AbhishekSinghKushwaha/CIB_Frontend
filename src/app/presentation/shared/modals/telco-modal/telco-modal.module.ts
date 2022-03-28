import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TelcoModalComponent } from "./telco-modal.component";
import { MatStyleModule } from "src/app/mat-style.module";
import { TelcoService } from "src/app/core/services/modal-services/telco.service";

@NgModule({
  declarations: [TelcoModalComponent],
  imports: [CommonModule, MatStyleModule],
  exports: [TelcoModalComponent],
  providers: [TelcoService],
})
export class TelcoModalModule {}
