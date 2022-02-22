import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageModel } from 'src/app/core/domain/language.model';
import { LanguageService } from 'src/app/core/services/language/language.service';

@Component({
  selector: 'app-language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.scss']
})
export class LanguageModalComponent implements OnInit {
  selected: LanguageModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public languages: LanguageModel[],
    private readonly languageService: LanguageService) { }

  ngOnInit(): void {
  }

  close() {
    this.languageService.close(this.selected);
  }

  onSelect(row: LanguageModel) {
    this.selected = row;
    row && this.close();
  }

}
