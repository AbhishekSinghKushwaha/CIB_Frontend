import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AddMerchantService } from 'src/app/core/services/add-merchant/add-merchant.service';

@Component({
  selector: "app-complete-transfer",
  templateUrl: "./complete-transfer.component.html",
  styleUrls: ["./complete-transfer.component.scss"],
})
export class CompleteTransferComponent implements OnInit {

  transferType: string;

  constructor(private router: Router,
    private readonly route: ActivatedRoute,
    private readonly addMerchantService: AddMerchantService) {
    this.transferType = route.snapshot.params['type'];
  }

  ngOnInit(): void {}

  done() {
    this.router.navigate(["/transact"]);
  }

  openAddFavourite(){
    this.addMerchantService.open(this.transferType);
  }

  clearAllSubjects() {}
}
