import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerOnboardingService } from 'src/app/core/services/customer-onboarding/customer-onboarding.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss'],
})
export class UploadDocumentsComponent implements OnInit {
  currentFile?: File;
  fileName = '';
  files: any = [];
  progress = 20;
  progressFiles: any[] = [];
  message = '';
  test: any;
  constructor(
    private router: Router,
    private onboardingService: CustomerOnboardingService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  uploadFiles(event: any) {
    const file: File = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0];

    if (file) {
      this.currentFile = file;
      this.fileName = this.currentFile.name;
      var pattern = /image-*/ || /.pdf/;
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  _handleReaderLoaded(e: any) {
    console.log('_handleReaderLoaded');
    var reader = e.target;
    const base64Image = reader.result;
    this.files.push({
      documentName: this.fileName,
      image: base64Image,
    });
    this.progressFiles.push({
      documentName: this.fileName,
      image: base64Image,
      progress: 0,
    });
    this.updateUpload();
    // if (this.progress === 100) {
    //   this.message = 'Completed';
    // }
  }

  cancelUpload(i: any) {
    this.reset(i);
  }

  reset(num: any) {
    this.files.splice(num, 1);
  }

  // Temporary fix to simulate the upload process
  updateUpload() {
    const uploadInterval = setInterval(() => {
      this.progressFiles[0].progress += 50;

      if (this.progressFiles[0].progress === 100) {
        this.progressFiles.pop();
        console.log(this.progressFiles);
        this.message = 'Completed';
        clearInterval(uploadInterval);
      }
    }, 2000);
  }

  upload() {
    this.onboardingService
      .uploadCorporateDocuments(
        { documents: this.files },
        this.storageService.getData('corporateId')
      )
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.router.navigate([
            '/auth/customer-onboarding/register/submission-successful',
          ]);
        }
      });
  }
}
