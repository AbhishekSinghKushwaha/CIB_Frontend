import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-virtual-account-opening-wizard',
  templateUrl: './virtual-account-opening-wizard.component.html',
  styleUrls: ['./virtual-account-opening-wizard.component.scss']
})
export class VirtualAccountOpeningWizardComponent implements OnInit {
  formStage = 1;

  constructor() { }

  ngOnInit(): void {
  }

  submit(stage: number) {
    if (stage !== 0) {
      this.formStage = stage
    }
  }

}
