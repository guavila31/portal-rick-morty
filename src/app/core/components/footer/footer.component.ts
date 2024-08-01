import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    public translateService: TranslateService
  ) { }

  changeLanguage(language: string): void {
    this.translateService.use(language);
  }

}
