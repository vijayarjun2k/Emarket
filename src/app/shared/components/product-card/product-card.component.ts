import { Component, Input, Output, OnInit,EventEmitter } from '@angular/core';
import { IProduct } from '../../models/product.interface';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from "@angular/material/icon";
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatIconModule,
    MatIcon
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: IProduct;
  @Output() handleAdd = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  addToCart(product: IProduct) {
    this.handleAdd.emit(product);
  }
}
