import { Location } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SecurityQuestionModel } from 'src/app/core/domain/security-question.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SecurityChallengeService } from 'src/app/core/services/security-challenge/security-challenge.service';
import { CONFIRMATIONCOMPLETION } from 'src/app/core/utils/constants/confirmation.constants';
@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.scss'],
})
export class SecurityQuestionsComponent implements OnInit {

  selectedCountry: any = {};
  submitted = false;
  allSecurityQuestions: SecurityQuestionModel[] = [];
  selectedItem: SecurityQuestionModel[] = [];
  selectedChecker:boolean;
  @Output() error = new Subject<boolean>();
  stage:string;
  allAnswers:any;
  securityChallengeForm: FormGroup = new FormGroup({});
  otpError: boolean;
  initialResponse='';
  completionData=CONFIRMATIONCOMPLETION.changeSecurityQuestionData;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private securityChallengeService:SecurityChallengeService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.getAllQuestions();
    this.initForm();
  }
  getAllQuestions():void{
    this.securityChallengeService.getSecurityQuestions().subscribe(
      (response) => {
        this.allSecurityQuestions = response;
      
      },
      (error) => {
        this.error.next(true);
      })
  }
  initForm(): void {
  
  }
  toggleProduct(question:SecurityQuestionModel, i:number): void {
const selectedIndex=this.selectedItem.find(x=>x.id==question.id);
   if(!selectedIndex){
this.selectedItem.push(question)
   }else{
    this.selectedItem= this.selectedItem.filter(x=>!(x.id==selectedIndex.id));

   }
   this.selectedChecker=this.selectedItem.length>1;
  }


  isChecked(pro:any){
return this.selectedItem.find(x=>x==pro)?true:false;
  }
  
  onContinue(){
   this.stage="security-questions";
  }

  
  onSecurityVerificationError(error: boolean) {
    if (error) {
      this.stage = 'security-questions';
    }
  }
securitySubmitQuestion(answer:any){
  this.allAnswers=answer;
  this.authService.resendOTP().subscribe(
    (data:any) => {
      this.stage = 'sms-verification';
      this.initialResponse = data.statusMessage;
    },
    (error) => {
      console.log(error);
    }
  ); 

}
smsVerificationSubmit(otp: string) {
  this.otpError = false;
 const formInputs= this.allAnswers
  if (otp) {
const payload={
  otpCode:otp,...formInputs
}
debugger;
   this.finallySecuritySubmitQuestion(payload)
  }
}
confirmationDone(event:boolean){
  this.location.back();
}
backButton(){
  if (!this.stage) {
this.location.back()
  } else {
    this.stage = '';
  }
}
  finallySecuritySubmitQuestion(answers:any) {
    //userIdentifier: this.credentialsControls.credentials.value 
    const result = { ...answers};
    console.log(result);
    this.securityChallengeService.updateSecurityQuestionAnswers(result)
      .subscribe(
        (response) => {
          if (response) {
      
            this.stage = 'change-security-password';
          }
        },
        (error) => {
          console.log({ error });
        }
      );
  }


  
}
