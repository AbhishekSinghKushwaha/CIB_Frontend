import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { DeleteService } from 'src/app/core/services/delete/delete.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteModal } from 'src/app/core/domain/delete.modal';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class DeleteComponent implements OnInit {

  constructor(
    private readonly deleteService: DeleteService,
    readonly dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteModal
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }
}
