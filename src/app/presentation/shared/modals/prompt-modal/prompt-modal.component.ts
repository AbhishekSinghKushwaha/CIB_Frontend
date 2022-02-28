import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PromptModel } from 'src/app/core/domain/prompt.model';
import { PromptModalService } from 'src/app/core/services/modal-services/prompt-modal.service';

@Component({
  selector: 'app-prompt-modal',
  templateUrl: './prompt-modal.component.html',
  styleUrls: ['./prompt-modal.component.scss'],
})
export class PromptModalComponent implements OnInit {
  promptForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PromptModel,
    private promptModalService: PromptModalService
  ) {
    this.promptForm = new FormGroup({
      promptField: new FormControl(
        '',
        this.data.required ? [Validators.required] : []
      ),
    });
  }

  ngOnInit(): void {}

  refusalClicked() {
    this.promptModalService.close(undefined);
  }

  confirmationClicked() {
    const promptValue = this.promptForm.controls['promptField'].value;
    
    this.promptModalService.close(promptValue);
  }
}
