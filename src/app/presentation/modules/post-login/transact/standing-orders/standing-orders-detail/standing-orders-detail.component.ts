import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationCompletionModel } from 'src/app/core/domain/confirmation-completion.model';
import { ConfirmationModel } from 'src/app/core/domain/confirmation.model';
import { StandingOrdersListmodel } from 'src/app/core/domain/standing-orders-list.model';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { confirmModal } from 'src/app/presentation/shared/decorators/confirm-dialog.decorator';
import { DeleteService } from 'src/app/core/services/delete/delete.service';


@Component({
  selector: 'app-standing-orders-detail',
  templateUrl: './standing-orders-detail.component.html',
  styleUrls: ['./standing-orders-detail.component.scss']
})
export class StandingOrdersDetailComponent implements OnInit {

  show = true;
  id: number;
  status: string;
  category: string;
  data: StandingOrdersListmodel;
  standingOrderDetail: ConfirmationModel[] = mockData.standingOrderDetail;
  transactionIcon = { Active: 'transaction_approved', Inactive: 'transaction_pending' };
  completionData: ConfirmationCompletionModel = {
    title: '',
    buttonText: 'Done',
    message: 'Transaction submitted for approval',
    subMessage: `<div>Transaction of 0.00 KES, daily transaction limit 0.00 KES was submitted on 16/04/2020 at 10:45:23 for approval.</div>
   <div>You will be notified once the transaction has been reviewed.</div>`,
    icon: 'assets/images/icons/visual-support-icons-virtual-account-submission-avatar.svg'
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly deleteService: DeleteService
  ) {
    this.id = route.snapshot.params['id'];
    this.data = mockData.standingOrders.find((_, i) => i === this.id) || mockData.standingOrders[0];
  }

  ngOnInit(): void {
  }
  
  update() {
    console.log('update');   
  }

  delete() {
    const payload = {
      title: 'Are you sure?',
      message: 'Once you delete, all their details will be deleted. You can add them again anytime.',
      buttonNo: "No, I'm not",
      buttonYes: "Yes, I’m sure"
    }
    this.deleteService.open(payload);
  }

  editStandingOrder(index: number) {
    this.router.navigate([`transact/standing-orders/edit/${index}`])
  }
}
