import { Component, OnInit } from '@angular/core';
import { UploadConfirmationService } from 'src/app/core/services/upload-confirmation/upload-confirmation.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-confirmation',
  templateUrl: './upload-confirmation.component.html',
  styleUrls: ['./upload-confirmation.component.scss']
})
export class UploadConfirmationComponent implements OnInit {

  constructor(
    private readonly uploadConfirmationService: UploadConfirmationService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.router.navigate(["/transact/bulk-transfer/details"]);
    this.dialog.closeAll();
  }

}
