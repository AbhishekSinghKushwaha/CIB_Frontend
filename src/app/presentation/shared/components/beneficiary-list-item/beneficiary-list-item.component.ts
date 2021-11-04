import { Component, OnInit, Input } from '@angular/core';
import { FavouriteBeneficiaryModel } from 'src/app/core/domain/favourites-beneficiary.model';
import { BeneficiaryManagementModalService } from 'src/app/core/services/beneficiary-management-modal/beneficiary-management-modal.service';
import { FavouritesModalService } from 'src/app/core/services/favourites-modal/favourites-modal.service';

@Component({
  selector: 'app-beneficiary-list-item',
  templateUrl: './beneficiary-list-item.component.html',
  styleUrls: ['./beneficiary-list-item.component.scss']
})
export class BeneficiaryListItemComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() category = 'manage-favourites';
  @Input() data: FavouriteBeneficiaryModel;
  @Input() showCheckbox = false;

  constructor(private readonly favouritesModalService: FavouritesModalService,
    private readonly beneficiaryManagementModalService: BeneficiaryManagementModalService,) { }

  ngOnInit(): void {
  }

  selectSingle(): void {
    this.favouritesModalService.select(this.data);
  }

  selectMultiple(): void {
    this.beneficiaryManagementModalService.select(this.data);
  }
}
