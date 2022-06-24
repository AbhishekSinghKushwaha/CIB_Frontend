import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { otpVerificationListModel } from 'src/app/core/domain/otp-verification-list.model';
import { OtpVerificationListService } from 'src/app/core/services/otp-verification-list/otp-verification-list.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { OtpVerificationConstants } from 'src/app/core/utils/constants/otp-verification-list.constants';
import { OtpVerificationConfirmationComponent } from 'src/app/presentation/shared/modals/otp-verification-confirmation/otp-verification-confirmation.component';

@Component({
  selector: 'app-otp-access',
  templateUrl: './otp-access.component.html',
  styleUrls: ['./otp-access.component.scss']
})
export class OtpAccessComponent implements OnInit {

  selected:any;
  counter: number = 0;
  otpMode: string | undefined;
  selectedOtp: otpVerificationListModel | any;
  arr: Array<string>
  visibility: boolean;
  otpOptions: any = []
  element: any;
  currentUser: any;

  constructor(
    public readonly data: OtpVerificationConstants,
    private readonly otpVerificationListService: OtpVerificationListService,
    private readonly dialog: MatDialog,
    private storageService: StorageService,

  ) { }

  ngOnInit(): void {
    this.otpOptions = [];
    this.currentUser = this.storageService.getData('currentUserData');
    // on load, select email as default
    this.setDefaultOption();
  }

  setDefaultOption() {

    if((!this.currentUser.smsIsSet && !this.currentUser.emailIsSet) || (!this.currentUser.smsIsSet && this.currentUser.emailIsSet)){
      this.data.OTP_LIST[1].isSet = true;
      this.selected = this.data.OTP_LIST[1];
      this.selectedOtp = this.selected;
      this.otpOptions.push(this.selectedOtp.verificationValue);

    }
    else if(this.currentUser.smsIsSet && !(this.currentUser.emailIsSet)){
      this.data.OTP_LIST[0].isSet = true;
      this.selected = this.data.OTP_LIST[0];
      this.selectedOtp = this.selected;
      this.otpOptions.push(this.selectedOtp.verificationValue);

    }
    else if (this.currentUser.smsIsSet && this.currentUser.emailIsSet) {
    this.data.OTP_LIST.map((value) => {
      value.isSet = true
      this.selected = value;
      this.selectedOtp = this.selected;
      this.otpOptions.push(this.selectedOtp.verificationValue);
    
    });
   
  }
    
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
