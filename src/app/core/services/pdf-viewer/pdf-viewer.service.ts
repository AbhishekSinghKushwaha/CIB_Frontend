import { Injectable } from '@angular/core';
import { PdfViewerModalComponent } from 'src/app/presentation/shared/modals/pdf-viewer-modal/pdf-viewer-modal.component';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class PdfViewerService {

  // data = new Subject<[]>();
  private defaultData:any;

  constructor(private readonly dialog: MatDialog) { }

  open(data: any): void {
    this.dialog.open<PdfViewerModalComponent>(PdfViewerModalComponent, {
      disableClose: true,
      data
    });
  }

  set(input: any): void {
    this.defaultData = { ...this.defaultData, ...input };
    // this.data.next(this.defaultData);
    console.log(this.defaultData);
  }

  get default():any{
    return this.defaultData
  }
}
