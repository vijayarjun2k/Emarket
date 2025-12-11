import {
  patchState,
  signalState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { IProduct } from '../shared/models/product.interface';
import { Injectable, computed } from '@angular/core';
import { calculateTotalPrice } from '../states/cart/cart.reducer';

export interface CartState {
  products: IProduct[];
}
function isBrowser() {
  return typeof window !== 'undefined';
}

const savedCart = isBrowser()
  ? JSON.parse(localStorage.getItem('cart') || '[]')
  : [];

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState({
    products: savedCart
  }),
  withComputed(({ products }) => ({
    totalPrice: computed(() => calculateTotalPrice(products())),
  })),
  withMethods(({ products, ...store }) => {

    function save(productsList: IProduct[]) {
      if (isBrowser()) {
        localStorage.setItem('cart', JSON.stringify(productsList));
      }
    }

    return {
      addToCart(product: IProduct) {
        const updated = [...products(), product];
        patchState(store, { products: updated });
        save(updated);
      },

      removeItem(id: number) {
        const updated = products().filter((p: { id: number; }) => p.id !== id);
        patchState(store, { products: updated });
        save(updated);
      },

      increment(id: number) {
        const updated = products().map((p: { id: number; quantity: number; }) =>
          p.id === id ? { ...p, quantity: p.quantity + 1 } : p
        );
        patchState(store, { products: updated });
        save(updated);
      },

      decrement(id: number) {
        const updated = products().map((p: { id: number; quantity: number; }) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        );
        patchState(store, { products: updated });
        save(updated);
      },

      updateQuantity(id: number, qty: number) {
        const updated = products().map((p: { id: number; }) =>
          p.id === id ? { ...p, quantity: qty } : p
        );
        patchState(store, { products: updated });
        save(updated);
      }
    };
  })
);
