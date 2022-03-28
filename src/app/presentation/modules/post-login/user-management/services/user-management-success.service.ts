import { Injectable } from '@angular/core';

@Injectable()
export class UserManagementSuccessService {
  private backButtonText: string;

  constructor() {}

  setBackButtonText(backButtonText: string): void {
    this.backButtonText = backButtonText;
  }

  getBackButtonText(): string {
    return this.backButtonText;
  }
}
