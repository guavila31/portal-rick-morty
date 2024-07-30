import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  @Input() oCharacter: any
  @Output() addFavorite = new EventEmitter<any>();
  @Output() removeFavorite = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    // this.oCharacter = { ...this.oCharacter, favorite: false }
  }

  setFavorite() {
    this.oCharacter.favorite = !this.oCharacter.favorite
    if (this.oCharacter.favorite)
      this.addFavorite.emit(this.oCharacter);
    else
      this.removeFavorite.emit(this.oCharacter);
  }
}
