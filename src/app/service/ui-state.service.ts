import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiStateService {
  private menuVisible$ = new BehaviorSubject<boolean>(true);

  setMenuVisible(value: boolean) {
    this.menuVisible$.next(value);
  }

  getMenuVisible() {
    return this.menuVisible$.asObservable();
  }
}
