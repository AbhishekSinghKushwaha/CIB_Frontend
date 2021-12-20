import { Component, OnInit, Input, Inject, ViewChildren, ElementRef  } from '@angular/core';
import { otpCodeModel } from 'src/app/core/domain/otp-code.model';
import { OtpCodeService } from 'src/app/core/services/otp-code/otp-code.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GenerateOtpService } from 'src/app/core/services/generate-otp/generate-otp.service';
import { BuyGoodsService } from 'src/app/core/services/transfers/buy-goods/buy-goods.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-by-code',
  templateUrl: './verify-by-code.component.html',
  styleUrls: ['./verify-by-code.component.scss']
})
export class VerifyByCodeComponent implements OnInit {

  timeLeft: number = 60;
  interval:any;
  alertVisible: boolean;
  alertMessage: string;
  @Input() data: any;
  payload: any;


  form: FormGroup;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;

  constructor(
    private readonly otpCodeService: OtpCodeService,
    private readonly generateOtpService: GenerateOtpService,
    private readonly buyGoodsService: BuyGoodsService,
    private readonly router: Router,
  ) { 
    this.form = this.toFormGroup(this.formInput);
  }

  toFormGroup(elements:any[]) {
    const group: any = {};

    elements.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.otpCodeService.set(this.form.value);
  }

  showAlert(message: string): void {
    if (this.alertVisible) {
      return;
    }
    this.alertVisible = true;
    this.alertMessage = message;
    setTimeout(() => this.alertVisible = false, 2500)
  }

  resendOtp() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
        this.pauseTimer();
      }
    },1000)
    this.showAlert("We’ve sent you another code");
    this.buyGoodsService.currentData.subscribe(data => {
      this.payload = data;
      if(data) {
        this.generateOtpService.generateOtp(this.payload);
      }
    });
  }

  verify() {
    this.buyGoodsService.currentData.subscribe(data => {
      this.payload = data;
      if(data) {
        this.buyGoodsService.sendToBuyGoods(this.payload).subscribe((res) => {
          if(res.status){
            this.router.navigate(["/transact/buy-goods/submit-transfer"]);
          }
        });
      }
    });
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

}
