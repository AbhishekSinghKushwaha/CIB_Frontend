import { Component, OnInit, Inject } from '@angular/core';
import { DownloadTemplateService } from 'src/app/core/services/download-template/download-template.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DownloadTemplateModal } from 'src/app/core/domain/download-template.model';

@Component({
  selector: 'app-template-format',
  templateUrl: './template-format.component.html',
  styleUrls: ['./template-format.component.scss']
})
export class TemplateFormatComponent implements OnInit {
  
  alertVisible: boolean;
  alertMessage: string;

  constructor(
    private readonly dialogRef: MatDialogRef<TemplateFormatComponent>,
    private readonly downloadTemplateService: DownloadTemplateService,
    @Inject(MAT_DIALOG_DATA) public data: DownloadTemplateModal[],
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  showAlert(message: string): void {
    if (this.alertVisible) {
      return;
    }
    this.alertVisible = true;
    this.alertMessage = message;
    setTimeout(() => (this.alertVisible = false), 2500);
  }

  closeTemplateFormat() {
    this.dialog.closeAll();
    this.showAlert("You successfully downloaded a template");
  }

  close(): void {
    this.dialogRef.close(true);
  }
}
