import { Component, OnInit, Input } from '@angular/core';
import { FavouriteBeneficiaryModel } from 'src/app/core/domain/favourites-beneficiary.model';
import { FavouritesModalService } from 'src/app/core/services/favourites-modal/favourites-modal.service';

@Component({
  selector: 'app-beneficiary-list-item',
  templateUrl: './beneficiary-list-item.component.html',
  styleUrls: ['./beneficiary-list-item.component.scss']
})
export class BeneficiaryListItemComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() data: FavouriteBeneficiaryModel;

  constructor(  private readonly favouritesModalService: FavouritesModalService) { }

  ngOnInit(): void {
  }

  select(): void {
    this.favouritesModalService.selectedAccount.next(this.data);
  }
}
