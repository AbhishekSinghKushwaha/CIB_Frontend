import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Director } from 'src/app/core/domain/customer-onboarding.model';
import { DirectorsService } from 'src/app/core/services/customer-onboarding/directors.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { confirmModal } from 'src/app/presentation/shared/decorators/confirm-dialog.decorator';
import { DirectorConfirmationModalComponent } from 'src/app/presentation/shared/modals/customer-onboarding-modals/director-confirmation-modal/director-confirmation-modal.component';

@Component({
  selector: 'app-company-directors',
  templateUrl: './company-directors.component.html',
  styleUrls: ['./company-directors.component.scss'],
})
export class CompanyDirectorsComponent implements OnInit {
  directors: Director[];

  constructor(
    private readonly dialog: MatDialog,
    private directorsService: DirectorsService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getCompanyDirectors();
  }

  @confirmModal({
    title: 'Are you sure',
    message:
      'Once you remove a director, all their details will be deleted. You can add them again anytime.',
    cancelText: "No, I'm not",
    confirmText: "Yes, I'm sure",
  })
  delete(referenceId: string) {
    this.directorsService.deleteDirector(referenceId).subscribe((res) => {
      if (res.isSuccessful) {
        this.getCompanyDirectors();
      }
    });
  }

  openDirectorInfoModal() {
    this.dialog.open<DirectorConfirmationModalComponent>(
      DirectorConfirmationModalComponent,
      {
        maxWidth: '1000px',
        disableClose: true,
        data: this.directors,
      }
    );
  }

  getCompanyDirectors() {
    this.directorsService
      .getCompanyDirectors(this.storageService.getData('corporateId'))
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.directors = res.data;
        }
      });
  }

  generateInitials(name: string): string {
    let initials = '';

    for (let i = 0; i < name.length; i++) {
      if (name.charAt(i) === ' ') {
        continue;
      }

      if (name.charAt(i) === name.charAt(i).toUpperCase()) {
        initials += name.charAt(i);

        if (initials.length === 2) {
          break;
        }
      }
    }

    return initials;
  }
}
