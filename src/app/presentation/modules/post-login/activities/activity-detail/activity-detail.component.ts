import { Component, OnInit } from '@angular/core';
import { ConfirmationModel } from 'src/app/core/domain/confirmation.model';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { SupportingDocumentsUploadService } from './../../../../../core/services/supporting-documents-upload/supporting-documents-upload.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {
  transactionDetail: ConfirmationModel[] = mockData.transactionDetail;

  constructor(private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService) { }

  ngOnInit(): void {
  }

  openUploadModal() {
    this.supportingDocumentsUploadService.open()
  }
}
