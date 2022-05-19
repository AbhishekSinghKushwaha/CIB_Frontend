import { UserService } from 'src/app/core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { SupportingDocumentsUploadService } from 'src/app/core/services/supporting-documents-upload/supporting-documents-upload.service';
import { DataLookupService } from 'src/app/core/services/data-lookup/data-lookup.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  profileUpdated: boolean = false;
  profileDetailForm: FormGroup;
  languages: any[] = []
  currencies: any[] = []
  dateFormats: any[] = []
  fontSizes: any[] = []
  timeZones: any[] = []
  currentUser: any;
  currentCountry: any;
  constructor(
    private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly fb: FormBuilder,
    private userService: UserService,
    private storageService: StorageService,
    private dataLookupService: DataLookupService
  ) {
  }

  get getForm() {
    return this.profileDetailForm.controls;
  }
  ngOnInit(): void {
    this.initForm();
    this.currentUser = this.storageService.getData("currentUserData");
    this.currentCountry = this.storageService.getData("userCountry");
    this.profileDetailForm.setValue({
      emailAddres: this.currentUser.emailAddress,
      phoneNumber: this.currentUser.phoneNumber,
      language: this.currentUser.language,
      timeZone: this.currentUser.timezone,
      dateFormat: this.currentUser.dateFormat,
      currencyFormat: this.currentUser.currency,
      fontSize: this.currentUser.fontSize
    })
    this.getLanguages();
    this.getCurrencies();
    this.getDateFormats();
    this.getFontSizes();
    this.getTimezones();
  }

  initForm(): void {
    this.profileDetailForm = this.fb.group({
      emailAddres: [""],
      phoneNumber: ["", [Validators.required]],
      language: ["", [Validators.required]],
      timeZone: ["", [Validators.required]],
      dateFormat: ["", [Validators.required]],
      currencyFormat: ["", [Validators.required]],
      fontSize: ["", [Validators.required]]
    })
  }

  openSupportingDocuments(): void {
    this.supportingDocumentsUploadService.open();
  }

  getLanguages() {
    this.userService.getLanguages().subscribe((res: any) => {
      if (res.isSuccessful) {
        this.languages = res.data;
      }
    })
  }

  getCurrencies() {
    this.userService.getCurrencies().subscribe((res: any) => {
      if (res.isSuccessful) {
        this.currencies = res.data;
      }
    })
  }

  getDateFormats() {
    this.userService.getDateFormats().subscribe((res: any) => {
      if (res.isSuccessful) {
        this.dateFormats = res.data;
      }
    })
  }

  getFontSizes() {
    this.userService.getFontSizes().subscribe((res: any) => {
      if (res.isSuccessful) {
        this.fontSizes = res.data;
      }
    })
  }

  getTimezones() {
    this.userService.getTimezones().subscribe((res: any) => {
      if (res.isSuccessful) {
        this.timeZones = res.data;
      }
    })
  }



  // Initiate fund transfer to own equity account
  updateUserDetails() {
    const payload = {
      language: this.getForm.language.value,
      dateFormat: this.getForm.dateFormat.value,
      showCurrencySymbol: true,
      currency: this.getForm.currencyFormat.value,
      fontSize: this.getForm.fontSize.value,
      decimalPointCount: 0,
      timezoneFormat: "UTC",
      timezone: this.getForm.timeZone.value,
      phoneNumber: this.getForm.phoneNumber.value,
    };
    if (this.profileDetailForm.valid) {
      this.userService.updateUserDetails(payload).subscribe((res: any) => {
        if (res.isSuccessful) {
          this.profileUpdated = true;
          this.dataLookupService.getUserData().subscribe((res) => {
            if (res.isSuccessful) {
              this.storageService.setData("currentUserData", res.data);
            }
          });
        }
      });

    }
  }

}
