import { CountryService } from 'src/app/core/services/modal-services/country.service';
import { TransferFromService } from 'src/app/core/services/modal-services/transfer-from.service';
import { GroupedAccountService } from './../../../core/services/modal-services/grouped-account.service';
import { StorageService } from './../../../core/services/storage/storage.service';
import { Component, EventEmitter, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageModel } from 'src/app/core/domain/language.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LanguageService } from 'src/app/core/services/language/language.service';
import { environment } from 'src/environments/environment';
import { confirmModal } from '../../shared/decorators/confirm-dialog.decorator';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnChanges {
  language: LanguageModel;
  userData: any;
  fullUsername: string;
  username: string;
  initials: string;
  currentCountry: any;

  @Output() ToggleSideMenu = new EventEmitter();
  constructor(private readonly authService: AuthService,
    private readonly groupedAccountService: GroupedAccountService,
    private readonly transferFromService: TransferFromService,
    private readonly countryService: CountryService,
    private readonly languageService: LanguageService,
    private storageService: StorageService,
    public translate: TranslateService) {
    this.language = languageService.defaultLanguage;
  }

  ngOnInit(): void {
    this.processUSerData();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  toggleSideMenu(): void {
    this.ToggleSideMenu.emit();
  }

  returnLogoUrl(): string {
    return `assets/images/logos/${environment.appInstance}/Primary.svg`;
  }

  @confirmModal({
    title: 'Are you sure you want to signout',
    message: '',
    cancelText: 'Keep me in',
    confirmText: 'Sign me out',
  })
  logout() {
    this.authService.doLogout('logout')
  }



  openLanguageModal() {
    const languages = this.languageService.languages;
    this.languageService.open(languages).afterClosed().subscribe(
      (selected: LanguageModel) => {
        if (selected) {
          this.language = selected;
          this.languageService.setCurrentLanguage(selected);
          this.translate.use(selected.langCode)
        }
      }

    );
  }

  selectProfile() {
    const groupedAccount = this.storageService.getData('grouped_account');
    this.groupedAccountService.openSelectAccountModal(groupedAccount)
    // this.transferFromService.openTransferFromModal(groupedAccount)
  }

  processUSerData() {
    this.userData = this.storageService.getData('user_data');
    this.fullUsername = this.userData.corporateName ? this.userData.corporateName : this.userData.firstName + ' ' + this.userData.lastName;
    this.username = this.userData.userName ? this.userData.userName : this.userData.emailAddress;
    this.initials = this.generateInitials(this.fullUsername);
    this.currentCountry = this.storageService.getData('userCountry')
  }

  generateInitials(name: string): string {
    let initials = '';

    for (let i = 0; i < name.length; i++) {
      if (name.charAt(i) === ' ') {
        continue;
      }

      if (name.charAt(i) === name.charAt(i).toUpperCase()) {
        initials += name.charAt(i);

        if (initials.length === 2) {
          break;
        }
      }
    }

    return initials;
  }
}
