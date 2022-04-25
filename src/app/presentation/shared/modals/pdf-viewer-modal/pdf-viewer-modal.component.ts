import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PdfViewerService } from "src/app/core/services/pdf-viewer/pdf-viewer.service";

@Component({
  selector: 'app-pdf-viewer-modal',
  templateUrl: './pdf-viewer-modal.component.html',
  styleUrls: ['./pdf-viewer-modal.component.scss']
})
export class PdfViewerModalComponent implements OnInit {

  constructor(
    readonly dialogRef: MatDialogRef<PdfViewerModalComponent>,
    private readonly pdfViewerService: PdfViewerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  close(): void {
    this.dialogRef.close(true);
  }

}
