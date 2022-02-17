import { Component, OnInit } from '@angular/core';
import { LanguageModel } from 'src/app/core/domain/language.model';
import { LanguageService } from 'src/app/core/services/language/language.service';

@Component({
  selector: 'app-language-input',
  templateUrl: './language-input.component.html',
  styleUrls: ['./language-input.component.scss']
})
export class LanguageInputComponent implements OnInit {
  language: LanguageModel;

  constructor(private readonly languageService: LanguageService) {
    this.language = languageService.defaultLanguage;
  }

  ngOnInit(): void {
  }

  openLanguageModal() {
    const languages = this.languageService.languages;
    this.languageService.open(languages).afterClosed().subscribe(
      (selected: LanguageModel) => this.language = selected
    );
  }

}
