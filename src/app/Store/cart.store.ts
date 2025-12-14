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
        const existing = products().find((p: { id: number; }) => p.id === product.id);

        let updated: IProduct[];

        if (existing) {
          updated = products().map((p: { id: number; quantity: any; }) =>
            p.id === product.id
              ? { ...p, quantity: (p.quantity ?? 1) + 1 }
              : p
          );
        } else {
          updated = [
            ...products(),
            { ...product, quantity: 1 }
          ];
        }

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
        const updated = products()
          .map((p: { id: number; quantity: number; }) =>
            p.id === id ? { ...p, quantity: p.quantity - 1 } : p
          )
          .filter((p: { quantity: number; }) => p.quantity > 0);

        patchState(store, { products: updated });
        save(updated);
      },

      updateQuantity(id: number, quantity: number) {
        if (quantity <= 0) {
          this.removeItem(id);
          return;
        }

        const updated = products().map((p: { id: number; }) =>
          p.id === id ? { ...p, quantity } : p
        );
        patchState(store, { products: updated });
        save(updated);
      },

      clearCart() {
        patchState(store, { products: [] });
        save([]);
      }
    };
  })
);