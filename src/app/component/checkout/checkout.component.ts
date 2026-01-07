import { Component, inject } from '@angular/core';
import { CartStore } from '../../Store/cart.store';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';


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
    MatInputModule,
    MatCardModule,
    MatIcon,
    MatDialogModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  cartStore = inject(CartStore);
  router = inject(Router);
  fb = inject(FormBuilder);
  dialog = inject(MatDialog);

  maxAddressLength = 40;

  /** 🔹 Address State */
  permanentAddress: any = null;
  savedAddress: any = null;
  selectedAddress: any = null;
  selectedCard: 'permanent' | 'saved' | null = null;

  /** 🔹 Form (UNCHANGED VALIDATIONS) */
  checkoutForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    addressLine: ['', [Validators.required, Validators.maxLength(this.maxAddressLength)]],
    city: ['', Validators.required],
    pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
  });

  ngOnInit(): void {
    // Simulate permanent address (normally from API/user profile)
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.permanentAddress = user?.address || null;

    // Load saved address (if exists)
    const saved = localStorage.getItem('savedAddress');
    if (saved) {
      this.savedAddress = JSON.parse(saved);
    }
  }

  /** 🔹 Card Selection */
  selectPermanent(): void {
    if (!this.permanentAddress) return;

    this.selectedCard = 'permanent';
    this.selectedAddress = this.permanentAddress;
  }

  selectSaved(): void {
    if (!this.savedAddress) return;

    this.selectedCard = 'saved';
    this.selectedAddress = this.savedAddress;
  }

  /** 🔹 Add New Address */
  openAddressDialog(): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(address => {
      if (address) {
        this.savedAddress = address;
        this.selectedAddress = address;
        this.selectedCard = 'saved';
        localStorage.setItem('savedAddress', JSON.stringify(address));
      }
    });
  }

  /** 🔹 Continue */
  proceedToPayment(): void {
    if (!this.selectedAddress) return;

    const payload = {
      userId: JSON.parse(localStorage.getItem('user') || '{}')?.id,
      cartItems: this.cartStore.products(),
      totalAmount: this.cartStore.totalPrice(),
      deliveryAddress: this.selectedAddress
    };

    localStorage.setItem('deliveryAddress', JSON.stringify(payload.deliveryAddress));
    localStorage.setItem('checkoutPayload', JSON.stringify(payload));

    this.router.navigate(['/payment']);
  }
}
