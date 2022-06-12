import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { otpVerificationListModel } from 'src/app/core/domain/otp-verification-list.model';
import { OtpVerificationListService } from 'src/app/core/services/otp-verification-list/otp-verification-list.service';
import { OtpVerificationConstants } from 'src/app/core/utils/constants/otp-verification-list.constants';
import { OtpVerificationConfirmationComponent } from 'src/app/presentation/shared/modals/otp-verification-confirmation/otp-verification-confirmation.component';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  selected: otpVerificationListModel;
  counter:number = 0;
  otpMode: string | undefined;
  selectedOtp: otpVerificationListModel;
  arr:Array<string>
  visibility: boolean;



  constructor(
    public readonly data: OtpVerificationConstants,
    private readonly otpVerificationListService: OtpVerificationListService,
    private readonly dialog: MatDialog
  ) {
    this.selected = otpVerificationListService.default;
    this.otpVerificationListService.selected.subscribe((x) =>{console.log(x, 'xxxx'), this.selected = x});
   }

  ngOnInit(): void {
   
  }

  select(selectedValue:otpVerificationListModel): void {
    this.selectedOtp = selectedValue
    console.log(this.counter, 'account',  this.otpMode)

  }

  onChangeDemo(ob: any) {
    this.counter = ob.checked? this.counter += 1 : this.counter -= 1
    this.otpMode = (this.counter == 2) ? 'All' : this.counter === 0 ? undefined: this.selectedOtp.verificationValue;
    // perfect logic on the right element to remove . consider storing in an array
}


openConfirmationModal(): void {
  const modal = this.call(this.otpMode);
  this.visibility = false;
  modal.afterClosed().subscribe(() => {
    this.visibility = true;
  });
}

call(data?: any) {
  return this.dialog.open<OtpVerificationConfirmationComponent>(OtpVerificationConfirmationComponent, {
    width: '500px',
    data
  });
}


}
