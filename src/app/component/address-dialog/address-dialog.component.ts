import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-address-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDialogContent,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './address-dialog.component.html',
  styleUrl: './address-dialog.component.css'
})
export class AddressDialogComponent {
 maxAddressLength = 40;

  checkoutForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    addressLine: ['', [Validators.required, Validators.maxLength(40)]],
    city: ['', Validators.required],
    pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddressDialogComponent>
  ) {}

  get addressCount(): number {
    return this.checkoutForm.get('addressLine')?.value?.length || 0;
  }

  saveAddress(): void {
    if (this.checkoutForm.valid) {
      this.dialogRef.close(this.checkoutForm.value);
    }
  }
}
