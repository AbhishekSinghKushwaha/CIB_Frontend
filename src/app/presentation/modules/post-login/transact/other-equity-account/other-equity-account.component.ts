import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CurrencySelectionModal } from 'src/app/core/domain/currency-selection.model';
import { FavouriteBeneficiaryModel } from 'src/app/core/domain/favourites-beneficiary.model';
import { ScheduledPaymentModel } from 'src/app/core/domain/scheduled-payment.model';
import { SelectAccountModel } from 'src/app/core/domain/select-account.model';
import { AccountsService } from 'src/app/core/services/accounts/accounts.service';
import { CurrencySelectionService } from 'src/app/core/services/currency-selection/currency-selection.service';
import { FavouritesModalService } from 'src/app/core/services/favourites-modal/favourites-modal.service';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';
import { IntrabankService } from 'src/app/core/services/transfers/intrabank/intrabank.service';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { accountLimitValidator } from 'src/app/core/utils/validators/limits.validators';
import { ConfirmPaymentComponent } from 'src/app/presentation/shared/modals/confirm-payment/confirm-payment.component';
import { BaseTransactComponent } from '../base-transact.component';
@Component({
  selector: 'app-other-equity-account',
  templateUrl: './other-equity-account.component.html',
  styleUrls: ['./other-equity-account.component.scss'],
})
export class OtherEquityAccountComponent
  extends BaseTransactComponent
  implements OnInit
{
  intraBankTransferForm: FormGroup;
  paymentDate: ScheduledPaymentModel;
  schedulePaymentData: ScheduledPaymentModel;
  loading: boolean = false;
  get getForm() {
    return this.intraBankTransferForm.controls;
  }

  constructor(
    private readonly selectAccountService: SelectAccountModalService,
    private readonly favouritesModalService: FavouritesModalService,
    accountsService: AccountsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private intraBankTransferService: IntrabankService,
    private router: Router
  ) {
    super(accountsService);
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.intraBankTransferForm = this.fb.group({
      sendFrom: ['', [Validators.required]],
      sendTo: ['', [Validators.required]],
      amount: [{}, [Validators.required, accountLimitValidator]],
      reason: [''],
      fxReferenceId: ['', [Validators.required]],
      schedulePayment: ['', [Validators.required]],
    });
  }

  openFavourites(): void {
    this.favouritesModalService.open(mockData.favourites);
  }

  // Get Transfer charges, then confirm payment.
  getTransferCharges() {
    this.loading = true;
    const payload = {
      amount: this.getForm.amount.value.amount,
      currency: this.getForm.amount.value.currency,
      destinationAccount: this.getForm.sendTo.value.accountNumber,
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: 1, // For Own Equity Account
    };
    this.intraBankTransferService
      .getTransferCharges(payload)
      .subscribe((res) => {
        if (res.status) {
          this.loading = false;
          this.confirmPayment(res.data);
        } else {
          this.loading = false;
          // TODO:: Notify error
        }
      });
  }

  // Confirm Payment and return the confirmation boolean before initiating payment.
  confirmPayment(transferFee: number) {
    if (this.intraBankTransferForm.valid) {
      const paymentData = {
        from: this.getForm.sendFrom.value,
        to: this.getForm.sendTo.value,
        amount: this.getForm.amount.value,
        transactionType: 'Send to another Equity account',
        paymentReason: this.getForm.reason.value,
        fxReferenceId: this.getForm.fxReferenceId.value,
        schedulePayment: {},
        transferFee,
      };
      const dialogRef = this.dialog.open(ConfirmPaymentComponent, {
        data: paymentData,
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((res) => {
        if (res.confirmed) {
          this.sendMoney();
        }
      });
    }
  }

  // Initiate fund transfer to another equity account
  sendMoney() {
    this.loading = true;
    const payload = {
      amount: this.getForm.amount.value.amount,
      beneficiaryAccount: this.getForm.sendTo.value.accountNumber,
      beneficiaryBank: '',
      beneficiaryBankCode: '54', // TODO:: Needs some more analysis. Bank Code is required in the intrabank journey
      beneficiaryCurrency: this.getForm.sendTo.value.currency,
      beneficiaryName: this.getForm.sendTo.value.accountName,
      currency: this.getForm.amount.value.currency,
      fxReferenceId: this.getForm.fxReferenceId.value,
      paymentReason: this.getForm.reason.value,
      schedulePayment: this.getForm.schedulePayment.value,
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: 2, // Intrabank transfer
    };

    console.log(payload);
    // TODO:: Uncomment the service code
    // if (this.intraBankTransferForm.valid) {
    //   this.intraBankTransferService
    //     .sendToAnotherEquityAccount(payload)
    //     .subscribe((res) => {
    //       if (res.status) {
    //         this.loading = false;
    //         this.router.navigate([
    //           '/transact/other-equity-account/submit-transfer',
    //         ]);
    //       } else {
    //         this.loading = false;
    //         alert(res.message);
    //         // TODO:: Notify error
    //       }
    //     });
    // }
  }
}
