import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  searchForm: FormGroup; 
  constructor(private readonly dialogRef: MatDialogRef<UserSearchComponent>) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }

  search(): void {
    this.close();
  }
}
