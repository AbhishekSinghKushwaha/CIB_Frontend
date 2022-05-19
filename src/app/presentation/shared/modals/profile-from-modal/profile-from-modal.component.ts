import { StorageService } from 'src/app/core/services/storage/storage.service';
import { TokenResponseModel } from 'src/app/core/domain/user-auth.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { GroupedAccountService } from 'src/app/core/services/modal-services/grouped-account.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupedAccountModel } from 'src/app/core/domain/account.model';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { TransferFromService } from 'src/app/core/services/modal-services/transfer-from.service';

@Component({
  selector: 'app-profile-from-modal',
  templateUrl: './profile-from-modal.component.html',
  styleUrls: ['./profile-from-modal.component.scss'],
})
export class ProfileFromModalComponent implements OnInit {
  hasSelectedAccount: boolean = false;
  processingChange: boolean = false;
  completedProcessing: boolean = false;
  switchStatus: string = 'accountSelection'
  selected: GroupedAccountModel = {
    address: undefined,
    corporateName: undefined,
    defaultCorporateAccount: undefined,
    emailAddress: undefined,
    id: undefined,
    phoneNumber: undefined,
    registrationNumber: undefined
  };


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GroupedAccountModel[],
    private readonly groupedAccountService: GroupedAccountService,
    private readonly authService: AuthService,
    private readonly storageService: StorageService
  ) {
  }

  ngOnInit(): void { }

  close(): void {
    this.groupedAccountService.closeSelectAccountModal();
  }

  selectAccount(account: GroupedAccountModel) {
    this.selected = account;
    this.hasSelectedAccount = true;
    this.switchStatus = 'accountSelected';
  }

  submitAccountSwitch() {
    const payload = {
      grant_type: 'client_credentials',
      client_id: 'onboarding',
      client_secret: 'postman-secret',
      scope: 'offline_access',
      corporateId: this.selected.id
    }
    this.switchStatus = 'processSwitch';
    this.authService.userSwitch(payload).subscribe(
      async (authData: TokenResponseModel) => {

        if (authData.access_token) {
          await this.authService.setToken({ ...authData })
          await this.storageService.setData('user_data', this.selected);

          this.switchStatus = 'completeChange'
        } else {
          this.close();
        }

      }
    )
  }

  completeTheSwithcProfile() {
    window.location.reload()
  }

}
