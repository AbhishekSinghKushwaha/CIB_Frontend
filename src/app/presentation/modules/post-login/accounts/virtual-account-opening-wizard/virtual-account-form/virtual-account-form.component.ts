import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-virtual-account-form',
  templateUrl: './virtual-account-form.component.html',
  styleUrls: ['./virtual-account-form.component.scss']
})
export class VirtualAccountFormComponent implements OnInit {
  virtualAccountForm: FormGroup;
  @Output() onSubmit = new Subject<number>();

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.virtualAccountForm = new FormGroup({
      region: new FormControl(null, [Validators.required]),
      unit: new FormControl(null, [Validators.required]),
      division: new FormControl(null, [Validators.required,]),
      description: new FormControl(null, [Validators.required,]),
    });
  }

  submit() {
    this.onSubmit.next(2);
  }
}
