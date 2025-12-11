import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenubarComponent } from './component/menubar/menubar.component';

import { Observable } from 'rxjs';
import { AppState } from './states/app.state';
import { selectCount } from './states/counter/counter.selector';
import { IProduct } from './shared/models/product.interface';
import { selectCartProducts } from './states/cart/cart.selector';
import { CartStore } from './Store/cart.store';
import { Store } from '@ngrx/store';
import { ProductsComponent } from './component/products/products.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MenubarComponent,
    ProductsComponent,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'emarket';
  count$: Observable<number>;
  products$: Observable<IProduct[]>;
  cartStore = inject(CartStore);

  constructor(private store: Store<AppState>){
     this.count$ = this.store.select(selectCount);
    this.products$ = this.store.select(selectCartProducts);
  }
}
