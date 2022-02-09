import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OtpVerificationListComponent } from 'src/app/presentation/shared/components/otp-verification-list/otp-verification-list.component';
import { otpVerificationListModel } from 'src/app/core/domain/otp-verification-list.model';

@Injectable({
  providedIn: 'root'
})
export class OtpVerificationListService {

  selected = new Subject<otpVerificationListModel>();
  private data:otpVerificationListModel;

  constructor() { }

  select(account: otpVerificationListModel): void {
    this.data = account
    this.selected.next(this.data)
    console.log(this.data)
  }

  get default():otpVerificationListModel{
    return this.data
  }
}
