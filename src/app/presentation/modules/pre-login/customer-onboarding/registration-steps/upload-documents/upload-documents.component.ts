import { Component, OnInit } from '@angular/core';

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
  message = '';
  constructor() {}

  ngOnInit(): void {}

  uploadFiles(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];

      if (file) {
        this.currentFile = file;
        this.fileName = this.currentFile.name;
        this.files.push(this.fileName);
        // this.progress = 70;
        this.updateUpload();

        if (this.progress === 100) {
          this.message = 'Completed';
        }
      }
    }
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
      this.progress += 20;

      if (this.progress === 100) {
        this.message = 'Completed';
        clearInterval(uploadInterval);
      }
    }, 2000);
  }
}
