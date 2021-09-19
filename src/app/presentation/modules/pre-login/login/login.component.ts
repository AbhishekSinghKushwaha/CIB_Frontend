import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginPasswordForm: FormGroup=new FormGroup({});
  hidePassword = true;
  submitted = false;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  get f(): any {
    return this.loginPasswordForm.controls;
  }

  private initForm(): void {
    this.loginPasswordForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  submit(){
    console.log('Submitted');
  }

}
