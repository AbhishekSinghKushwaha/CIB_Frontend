import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReasonModalComponent } from "./reason-modal.component";
import { FormElementsModule } from "../../form-elements/form-elements.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReasonModalService } from "src/app/core/services/modal-services/reason-modal/reason-modal.service";
import { MatStyleModule } from "src/app/mat-style.module";

@NgModule({
  declarations: [ReasonModalComponent],
  imports: [CommonModule, FormElementsModule, MatStyleModule],
  providers: [ReasonModalService],
})
export class ReasonModalModule {}
