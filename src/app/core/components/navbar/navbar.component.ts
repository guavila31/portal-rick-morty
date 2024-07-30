import { Component } from '@angular/core';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  counter$ = this.favoriteService.favorite$;
  tab$ = this.favoriteService.tab$;

  constructor(
    private favoriteService: FavoriteService
  ) { }

  switchTab(value: boolean) {
    this.favoriteService.updateTab(value);
  }
}
