import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LanguageModalComponent } from 'src/app/presentation/shared/modals/language-modal/language-modal.component';
import { LanguageModel } from '../../domain/language.model';
import { LANGUAGES } from '../../utils/constants/languages.constants';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class LanguageService {

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private readonly dialog: MatDialog
  ) { }

  countryModalRef: MatDialogRef<LanguageModalComponent, any>;

  open(data: LanguageModel[]) {
    this.countryModalRef = this.dialog.open<LanguageModalComponent, any>(
      LanguageModalComponent,
      {
        maxWidth: '30vw',
        disableClose: true,
        data,
      }
    );
    return this.countryModalRef;
  }

  close(data: LanguageModel): void {
    this.countryModalRef.close(data);
  }

  get defaultLanguage(): LanguageModel {
    return this.storageService.getData('currentLanguage') || LANGUAGES.all.find(x => x.id === LANGUAGES.default);
  }

  setCurrentLanguage(language: LanguageModel): void {
    this.storageService.setData('currentLanguage', language);
  }

  get languages(): LanguageModel[] {
    return LANGUAGES.all;
  }

}
