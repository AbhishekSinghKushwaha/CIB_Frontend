import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-complete-transfer",
  templateUrl: "./complete-transfer.component.html",
  styleUrls: ["./complete-transfer.component.scss"],
})
export class CompleteTransferComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  done() {
    this.router.navigate(["/transact"]);
  }

  clearAllSubjects() {}
}
