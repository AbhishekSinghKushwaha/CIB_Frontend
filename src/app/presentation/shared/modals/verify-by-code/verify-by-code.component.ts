import { Component, OnInit, Input, Inject, ViewChildren, ElementRef  } from '@angular/core';
import { otpCodeModel } from 'src/app/core/domain/otp-code.model';
import { OtpCodeService } from 'src/app/core/services/otp-code/otp-code.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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


  form: FormGroup;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;

  constructor(
    private readonly otpCodeService: OtpCodeService
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

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
        this.pauseTimer();
      }
    },1000)
    this.showAlert("We’ve sent you another code");
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

}
