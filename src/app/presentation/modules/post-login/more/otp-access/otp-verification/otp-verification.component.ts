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
  counter: number = 0;
  otpMode: string | undefined;
  selectedOtp: otpVerificationListModel | any;
  arr: Array<string>
  visibility: boolean;
  otpOptions: any = []
  element: any;

  constructor(
    public readonly data: OtpVerificationConstants,
    private readonly otpVerificationListService: OtpVerificationListService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // on load, select email as default
    this.selected = this.data.OTP_LIST[1];
    this.selectedOtp = this.selected;
    this.otpOptions.push(this.selectedOtp.verificationValue)
  }

  select(selectedValue: otpVerificationListModel): void {
    this.selectedOtp = selectedValue;
  }

  selectedIsChecked(): void {
    if (this.otpOptions.length == 0) {
      this.otpOptions.push(this.selectedOtp.verificationValue)
    }
    else {
      if (this.otpOptions.includes(this.selectedOtp.verificationValue)) {
        return this.otpOptions;
      }
      else {
        this.otpOptions.push(this.selectedOtp.verificationValue)
      }
    }
  }

  unChecked() {
    if (this.otpOptions.includes(this.selectedOtp.verificationValue)) {

      this.otpOptions.splice(this.otpOptions.indexOf(this.selectedOtp.verificationValue), 1);
      this.otpOptions.length === 0 ? this.selectedOtp = undefined :  this.otpOptions ;

    }
  }

  onSubmit() {
    this.otpVerificationListService.otpAccess(this.otpOptions)
    this.openConfirmationModal();
  }


  onChangeDemo(ob: any) {
    if (ob.checked) {
      this.selectedIsChecked()
    }
    else {
      this.unChecked()
    }

  }

  openConfirmationModal() {
    return this.dialog.open<OtpVerificationConfirmationComponent>(OtpVerificationConfirmationComponent, {
      width: '500px'
    });
  }


}
