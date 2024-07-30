import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Counter {
  counter: number;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private oInitCounter: Counter = { counter: 0 };
  private oInitTab: boolean = false;

  private tabSubject = new BehaviorSubject<boolean>(this.oInitTab);
  private counterSubject = new BehaviorSubject<Counter>(this.oInitCounter);

  favorite$ = this.counterSubject.asObservable();
  tab$ = this.tabSubject.asObservable();

  constructor() { }

  updateCounter(newFavorite: Partial<Counter>) {
    const currentFavorite = this.counterSubject.value;
    this.counterSubject.next({ ...currentFavorite, ...newFavorite });
  }

  updateTab(newTab: Partial<boolean>) {
    this.tabSubject.next(newTab);
  }
}
