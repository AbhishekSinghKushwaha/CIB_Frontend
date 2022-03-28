import { Component, OnInit } from "@angular/core";
import { TransactConstants } from "../../../../core/utils/constants/transact.constants";
@Component({
  selector: "app-transact",
  templateUrl: "./transact.component.html",
  styleUrls: ["./transact.component.scss"],
})
export class TransactComponent implements OnInit {
  constructor(public readonly transactDashboardList: TransactConstants) {}

  ngOnInit(): void {}
}
