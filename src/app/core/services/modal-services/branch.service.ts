import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BranchModalComponent } from '../../../presentation/shared/modals/branch-modal/branch-modal.component';
import { Subject } from 'rxjs';
import { CollectionOptionModalComponent } from 'src/app/presentation/shared/modals/collection-option-modal/collection-option-modal.component';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private collectionBranchData: string;
  private branchData: string;
  collectionBranchRef: MatDialogRef<CollectionOptionModalComponent, any>;
  branchRef: MatDialogRef<BranchModalComponent, any>;
  selectedBranch = new Subject<string>();
  selectedCollectionBranch = new Subject<string>();

  constructor(private readonly dialog: MatDialog) { }

  openCollectionBranch(data: string[]) {
    return this.collectionBranchRef = this.dialog.open<CollectionOptionModalComponent, string[]>(CollectionOptionModalComponent, {
      maxWidth: '400px',
      disableClose: true,
      data,
    });
  }

  selectCollectionBranch(item: string): void {
    this.collectionBranchData = item;
    this.selectedCollectionBranch.next(item);
  }

  get defaultCollectionBranch(): string {
    return this.collectionBranchData;
  }

  closeCollectionBranch() {
    this.collectionBranchRef.close();
  }

  openBranch(data: string[]) {
    return this.branchRef = this.dialog.open<BranchModalComponent, string[]>(BranchModalComponent, {
      maxWidth: '400px',
      disableClose: true,
      data,
    });
  }

  selectBranch(item: string): void {
    this.branchData = item;
    this.selectedBranch.next(this.branchData);
  }

  get defaultBranch(): string {
    return this.branchData;
  }

  closeBranch() {
    this.branchRef.close();
  }
}
