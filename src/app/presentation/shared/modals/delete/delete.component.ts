import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { DeleteService } from 'src/app/core/services/delete/delete.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteModal } from 'src/app/core/domain/delete.modal';
import { StandingOrdersService } from "src/app/core/services/transfers/standing-orders/standing-orders.service";
import { Router } from '@angular/router';

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
    @Inject(MAT_DIALOG_DATA) public data: DeleteModal,
    private readonly standingOrdersService: StandingOrdersService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }

  deleteStandingOrder() {
    const payload = {
      id: Number(this.data.id)
    }
    if(this.data.id) {
      this.standingOrdersService.deleteStandingOrder(payload.id).subscribe((res) => {
        if(res.status) {
          this.close();
          this.router.navigate(["/transact/standing-orders"]);
        }
      });
    }
  }
}
