import { Component, inject } from '@angular/core';
import { CartStore } from '../../Store/cart.store';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
   cartStore = inject(CartStore);
   router = inject(Router);
   fb = inject(FormBuilder);

    maxAddressLength = 40;

  checkoutForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/) // no numbers
      ]
    ],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    addressLine: [
      '',
      [Validators.required, Validators.maxLength(this.maxAddressLength)]
    ],
    city: ['', Validators.required],
    pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
  });

  get addressCount(): number {
    return this.checkoutForm.get('addressLine')?.value?.length || 0;
  }

  proceedToPayment() {
    if (this.checkoutForm.invalid) return;

    const payload = {
      userId: JSON.parse(localStorage.getItem('user') || '{}')?.id,
      cartItems: this.cartStore.products(),
      totalAmount: this.cartStore.totalPrice(),
      deliveryAddress: this.checkoutForm.value
    };

    localStorage.setItem('deliveryAddress', JSON.stringify(payload.deliveryAddress));
    localStorage.setItem('checkoutPayload', JSON.stringify(payload));

    // ready for API call later
    // this.checkoutService.saveAddress(payload).subscribe()

    this.router.navigate(['/payment']);
  }
}
