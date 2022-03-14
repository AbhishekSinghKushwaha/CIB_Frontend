import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MerchantDetailsModel } from 'src/app/core/domain/merchat-details.model';

@Injectable({
  providedIn: 'root'
})
export class MerchantDetailsService {
  merchantDetails = new BehaviorSubject<MerchantDetailsModel[]>([]);
  favouriteMerchantDetails = new BehaviorSubject<MerchantDetailsModel[]>([]);

  constructor() { }

  setMerchantDetails(data: MerchantDetailsModel[]) {
    this.merchantDetails.next(data);
  }

  setFavouriteMerchantDetails(data: MerchantDetailsModel[]) {
    this.favouriteMerchantDetails.next(data);
  }

}
