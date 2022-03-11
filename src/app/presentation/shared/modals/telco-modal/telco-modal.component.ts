import { Component, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Telco } from "src/app/core/domain/transfer.models";
import { TelcoService } from "src/app/core/services/modal-services/telco.service";
import { mockData } from "src/app/core/utils/constants/mockdata.constants";

@Component({
  selector: "app-telco-modal",
  templateUrl: "./telco-modal.component.html",
  styleUrls: ["./telco-modal.component.scss"],
})
export class TelcoModalComponent implements OnInit {
  isChecked: boolean = false;

  selected: any;

  visibility: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Telco[],
    private telcoService: TelcoService
  ) {}

  ngOnInit(): void {}

  close() {
    this.telcoService.telcoModalRef.close();
  }

  select(i: number) {
    this.selected = this.data[i];
    // this.visibility = false;
    this.telcoService.selectTelco(this.selected);
  }
}
