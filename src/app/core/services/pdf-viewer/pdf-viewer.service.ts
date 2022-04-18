import { Injectable } from '@angular/core';
import { PdfViewerComponent } from 'src/app/presentation/shared/modals/pdf-viewer/pdf-viewer.component';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class PdfViewerService {

  constructor(private readonly dialog: MatDialog) { }

  open(data: any): void {
    this.dialog.open<PdfViewerComponent>(PdfViewerComponent, {
      disableClose: true,
      data
    });
  }
}
