import { Component, inject } from '@angular/core';
import { CartStore } from '../../Store/cart.store';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  cartStore = inject(CartStore);
  showSuccess = false;
  deliveryDate!: string;

  pay(method: string) {
    // fake processing delay
    setTimeout(() => {
      const today = new Date();
      today.setDate(today.getDate() + 5);
      this.deliveryDate = today.toDateString();
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');

      orders.push({
        orderId: 'ORD' + Date.now(),
        date: new Date().toDateString(),
        amount: this.cartStore.totalPrice(),
        items: this.cartStore.products(),
        deliveryDate: this.deliveryDate,
        address: JSON.parse(localStorage.getItem('deliveryAddress')!),
      });

      localStorage.setItem('orders', JSON.stringify(orders));

      this.showSuccess = true;

      // clear cart after payment
      this.cartStore.clearCart();
    }, 1500);
  }
}
