import { Component, OnInit } from '@angular/core';
import { DownloadTemplateService } from 'src/app/core/services/download-template/download-template.service';
import { SupportingDocumentsUploadService } from "src/app/core/services/supporting-documents-upload/supporting-documents-upload.service";
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { BulkTransfersService } from 'src/app/core/services/transfers/bulk-transfers/bulk-transfers.service';

@Component({
  selector: 'app-bulk-transfer',
  templateUrl: './bulk-transfer.component.html',
  styleUrls: ['./bulk-transfer.component.scss']
})
export class BulkTransferComponent implements OnInit {

  alertVisible: boolean;
  alertMessage: string;
  checked = false;

  constructor(
    private readonly downloadTemplateService: DownloadTemplateService,
    private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly bulkTransfersService: BulkTransfersService
  ) { }

  ngOnInit(): void {
  }

  upload(){
    this.supportingDocumentsUploadService.open();
  }

  downloadTemplate() {
    const modal = this.downloadTemplateService.openDownload(mockData.downloadTemplate);
    modal.afterClosed().subscribe(() => {
      this.showAlert("You successfully downloaded a template");
    });
  }
  
  showAlert(message: string): void {
    if (this.alertVisible) {
      return;
    }
    this.alertVisible = true;
    this.alertMessage = message;
    setTimeout(() => (this.alertVisible = false), 2500);
  }

  onChange() {
    this.checked = !this.checked;
    this.bulkTransfersService.salaryPaymentEnabled(this.checked);
  } 
}
