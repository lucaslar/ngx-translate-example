import {Component} from '@angular/core';
import {LanguageService} from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NgxExample';

  constructor(private languageService: LanguageService) {
  }

  // For testing only:
  onLanguageClick(pLanguage: string, pSpec: string): void {
    this.languageService.changeLocale(pLanguage, pSpec);
  }
}
