import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { otpCodeModel } from 'src/app/core/domain/otp-code.model';

@Injectable({
  providedIn: 'root'
})
export class OtpCodeService {

  data = new Subject<otpCodeModel>();
  private defaultData:otpCodeModel;

  constructor() { }

  set(input: any): void {
    this.defaultData = { ...this.defaultData, ...input };
    this.data.next(this.defaultData);
    console.log(this.defaultData);
  }

  get default():otpCodeModel{
    return this.defaultData
  }
}
