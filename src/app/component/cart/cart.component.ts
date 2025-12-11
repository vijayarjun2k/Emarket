import { Component, inject } from '@angular/core';
import { AppState } from '../../states/app.state';
import { Store } from '@ngrx/store';
import { selectCartProducts, selectTotal } from '../../states/cart/cart.selector';
import { CommonModule } from '@angular/common';
import {
  decrementProduct,
  incrementProduct,
  removeItem,
} from '../../states/cart/cart.action';
import { CartStore } from '../../Store/cart.store';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../shared/models/product.interface';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
 cartItems$ = this.store.select(selectCartProducts);
  totalPrice$ = this.store.select(selectTotal);
  cartStore = inject(CartStore);
  constructor(private store: Store<AppState>) {}
  ngOnInit() {
  this.cartStore.products().forEach((p: { id: number; quantity: number; }) => {
    this.cartStore.updateQuantity(p.id, p.quantity);
  });
}

  remove(productId: number) {
    this.store.dispatch(removeItem({ productId }));
  }

  increment(productId: number) {
    this.store.dispatch(incrementProduct({ productId }));
  }

  decrement(productId: number, quantity: number) {
    if (quantity === 1) {
      this.cartStore.removeItem(productId);
    } else {
      this.cartStore.decrement(productId);
    }
    //this.store.dispatch(decrementProduct({ productId }));
  }
  onQuantityChange(item: IProduct) {
  let qty = Number(item.quantity);

  if (!qty || qty < 1) qty = 1;

  item.quantity = qty;
  this.cartStore.updateQuantity(item.id, qty);
}


}
