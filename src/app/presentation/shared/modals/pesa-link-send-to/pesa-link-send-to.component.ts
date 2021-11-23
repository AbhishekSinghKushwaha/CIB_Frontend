import { Component, Input, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FavouriteBeneficiaryModel } from 'src/app/core/domain/favourites-beneficiary.model';
import { PesaLinkSendToService } from 'src/app/core/services/pesa-link-send-to/pesa-link-send-to.service';
import { RecepientBankService } from 'src/app/core/services/recepient-bank/recepient-bank.service';
import { FavouritesModalService } from 'src/app/core/services/favourites-modal/favourites-modal.service';
import { PhoneLinkedService } from 'src/app/core/services/phone-linked/phone-linked.service';


@Component({
  selector: 'app-pesa-link-send-to',
  templateUrl: './pesa-link-send-to.component.html',
  styleUrls: ['./pesa-link-send-to.component.scss']
})
export class PesaLinkSendToComponent implements OnInit {

  @Input() isChecked: boolean;
  selected: FavouriteBeneficiaryModel;
  searchText: string;
  visibility = true;

  constructor(
    readonly dialogRef: MatDialogRef<PesaLinkSendToComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FavouriteBeneficiaryModel[],
    private readonly PesaLinkSendToService: PesaLinkSendToService,
    private readonly favouritesModalService: FavouritesModalService,
    private readonly recepientBankService: RecepientBankService,
    private readonly phoneLinkedService: PhoneLinkedService) {

    this.selected = favouritesModalService.default;
    this.favouritesModalService.selected.subscribe((x) => this.selected = x);
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }

  openBankList(): void {
    const modal = this.recepientBankService.open(null);
    this.visibility = false;
    modal.afterClosed().subscribe(() => {
      this.visibility = true;
    });
  }

  openPhoneLinked(): void {
    const modal = this.phoneLinkedService.open(null);
    this.visibility = false;
    modal.afterClosed().subscribe(() => {
      this.visibility = true;
    });
  }

}
