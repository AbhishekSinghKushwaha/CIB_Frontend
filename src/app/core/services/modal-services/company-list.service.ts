import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CompanyListModalComponent } from 'src/app/presentation/shared/modals/company-list-modal/company-list-modal.component';
import { CompanyListModel } from '../../domain/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyListService {
  modalRef: MatDialogRef<CompanyListModalComponent, any>;

  constructor(private readonly dialog: MatDialog) { }

  open(data: CompanyListModel[]) {
    this.modalRef = this.dialog.open<CompanyListModalComponent, CompanyListModel[]>(
      CompanyListModalComponent,
      {
        maxWidth: '82vw',
        disableClose: true,
        data,
      }
    );
    return this.modalRef;
  }


  close(data?: CompanyListModel): void {
    this.modalRef.close(data);
  }
}
