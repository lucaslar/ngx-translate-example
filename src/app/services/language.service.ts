import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  readonly LANGUAGES = [
    new Language('en', 'GB'),
    new Language('de', 'DE'),
    new Language('es', 'ES'),
    new Language('pt', 'BR', 'PT'),
    new Language('fr', 'FR'),
  ];

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en-GB');
    this.changeLocale(this.userLocale);
  }

  private get userLocale(): string {
    let locale: string;
    if (navigator.languages && navigator.languages.length) {
      locale = navigator.languages.find(navLang => this.LANGUAGES.some(lang => lang.isSupported(navLang)));
    }
    return locale ? locale : navigator.language;
  }

  changeLocale(pLanguage: string, pSpec?: string): void {
    const value = pLanguage + (pSpec ? `-${pSpec}` : '');
    const language = this.LANGUAGES.find(lang => lang.isSupported(value));
    this.translate.use(language ? language.getLangFileForLocaleString(value) : this.translate.defaultLang);
  }

  get current(): string {
    return this.translate.currentLang;
  }
}

class Language {
  readonly SUPPORTED_SPECIFICATIONS: string[];
  private readonly REGEX: RegExp;

  constructor(readonly IDENTIFIER: string, ...pSupportedSpecifications: string[]) {
    this.REGEX = new RegExp(`${this.IDENTIFIER}-.+`);
    this.SUPPORTED_SPECIFICATIONS = pSupportedSpecifications;
    if (!this.SUPPORTED_SPECIFICATIONS.length) {
      console.error(`No specification for ${IDENTIFIER}!`);
    }
  }

  isSupported(pLocaleString: string): boolean {
    return this.IDENTIFIER === pLocaleString || this.REGEX.test(pLocaleString);
  }

  getLangFileForLocaleString(pLocaleString: string): string {
    let locale = `${this.IDENTIFIER}-${this.SUPPORTED_SPECIFICATIONS[0]}`;
    this.SUPPORTED_SPECIFICATIONS
      .map(spec => `${this.IDENTIFIER}-${spec}`)
      .forEach(loc => {
        if (loc === pLocaleString) {
          locale = loc;
        }
      });
    return locale;
  }
}
