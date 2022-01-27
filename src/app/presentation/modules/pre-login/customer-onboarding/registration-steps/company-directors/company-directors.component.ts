import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { confirmModal } from 'src/app/presentation/shared/decorators/confirm-dialog.decorator';
import { DirectorConfirmationModalComponent } from 'src/app/presentation/shared/modals/customer-onboarding-modals/director-confirmation-modal/director-confirmation-modal.component';

@Component({
  selector: 'app-company-directors',
  templateUrl: './company-directors.component.html',
  styleUrls: ['./company-directors.component.scss'],
})
export class CompanyDirectorsComponent implements OnInit {
  directors = [1, 2, 3, 4];

  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {}

  @confirmModal({
    title: 'Are you sure',
    message:
      'Once you remove a director, all their details will be deleted. You can add them again anytime.',
    cancelText: "No, I'm not",
    confirmText: "Yes, I'm sure",
  })
  delete() {
    this.directors.pop();
  }

  openDirectorInfoModal() {
    this.dialog.open<DirectorConfirmationModalComponent>(
      DirectorConfirmationModalComponent,
      {
        maxWidth: '1000px',
        disableClose: true,
      }
    );
  }
}
