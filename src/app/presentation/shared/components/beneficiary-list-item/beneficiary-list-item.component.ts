import { Component, OnInit, Input } from '@angular/core';
import { BeneficiaryModel } from 'src/app/core/domain/beneficiary.model';

import { TransferToService } from 'src/app/core/services/modal-services/transfer-to.service';

@Component({
  selector: 'app-beneficiary-list-item',
  templateUrl: './beneficiary-list-item.component.html',
  styleUrls: ['./beneficiary-list-item.component.scss'],
})
export class BeneficiaryListItemComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() category = 'manage-favourites';
  @Input() data: any; // Update favourite model
  @Input() showCheckbox = false;

  constructor(private readonly transferToService: TransferToService) {}

  ngOnInit(): void {}

  selectSingle(): void {
    this.transferToService.selectFavourite(this.data);
  }

  selectMultiple(): void {
    // this.beneficiaryManagementModalService.select(this.data);
  }

  openBeneficiaryForm(): void {
    //TODO This has to open with a default data
    // this.beneficiaryManagementFormModalService.open();
  }
}
