import { Component, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ConfirmationModel } from 'src/app/core/domain/confirmation.model';
import { ConfirmationModalService } from './../../../../core/services/modal-services/confirmation-modal.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationModel,
    private readonly confirmationModalService: ConfirmationModalService) { }

  ngOnInit(): void {
  }

  close() {
    this.confirmationModalService.close();
  }

  confirmationClicked() {

  }

}
