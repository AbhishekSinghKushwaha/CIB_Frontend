import { LanguageModel } from "../../domain/language.model";

export const LANGUAGES: { all: LanguageModel[], default: number } = {
  all: [
    { id: 1, langCode: 'en', langDesc: 'English' },
    { id: 2, langCode: 'fr', langDesc: 'Français' },
    { id: 3, langCode: 'zh', langDesc: '中文' },
    { id: 4, langCode: 'fr', langDesc: 'Français' },
    { id: 5, langCode: 'sw', langDesc: 'Swahili' },
    { id: 6, langCode: 'rw', langDesc: 'Kinyarwanda' },
    { id: 7, langCode: 'lg', langDesc: 'Buganda' }
  ],
  default: 1
}
