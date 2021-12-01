import { Component, OnInit, Input, Inject } from '@angular/core';
import { otpVerificationListModel } from 'src/app/core/domain/otp-verification-list.model';
import { OtpVerificationListService } from 'src/app/core/services/otp-verification-list/otp-verification-list.service';


@Component({
  selector: 'app-otp-verification-list',
  templateUrl: './otp-verification-list.component.html',
  styleUrls: ['./otp-verification-list.component.scss']
})
export class OtpVerificationListComponent implements OnInit {
  @Input() data: otpVerificationListModel;
  @Input() isChecked: boolean;
  
  constructor(
    private readonly otpVerificationListService: OtpVerificationListService
  ) { }

  ngOnInit(): void {
  }

  select(): void {
    this.otpVerificationListService.select(this.data);
  }

}
