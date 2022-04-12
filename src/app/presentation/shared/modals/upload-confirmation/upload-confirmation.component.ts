import { Component, OnInit } from '@angular/core';
import { UploadConfirmationService } from 'src/app/core/services/upload-confirmation/upload-confirmation.service';

@Component({
  selector: 'app-upload-confirmation',
  templateUrl: './upload-confirmation.component.html',
  styleUrls: ['./upload-confirmation.component.scss']
})
export class UploadConfirmationComponent implements OnInit {

  constructor(
    private readonly uploadConfirmationService: UploadConfirmationService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.uploadConfirmationService.close();
  }

}
