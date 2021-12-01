import { Component, Input, OnInit, Inject } from '@angular/core';
import { otpVerificationListModel } from 'src/app/core/domain/otp-verification-list.model';
import { OtpVerificationConstants } from 'src/app/core/utils/constants/otp-verification-list.constants';
import { OtpVerificationListService } from 'src/app/core/services/otp-verification-list/otp-verification-list.service';

@Component({
  selector: 'app-otp-verification-select',
  templateUrl: './otp-verification-select.component.html',
  styleUrls: ['./otp-verification-select.component.scss']
})
export class OtpVerificationSelectComponent implements OnInit {

  selected: otpVerificationListModel;
  @Input() isChecked: boolean;

  constructor(
    public readonly data: OtpVerificationConstants,
    private readonly otpVerificationListService: OtpVerificationListService,
  ) {
    this.selected = otpVerificationListService.default;
    this.otpVerificationListService.selected.subscribe((x) => this.selected = x);
   }

  ngOnInit(): void {
  }

}
