import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../states/app.state';
import { selectCount } from '../../states/counter/counter.selector';
import { AsyncPipe, CommonModule } from '@angular/common';
import { decrement, increment, reset  } from '../../states/counter/counter.action';
import { CounterStore } from '../../Store/counter.store';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
 count$: Observable<number>;
  counterStore = inject(CounterStore);

  constructor(private store: Store<AppState>) {
    this.count$ = this.store.select(selectCount);
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
