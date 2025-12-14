import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { IProduct } from '../../shared/models/product.interface';
import { ProductApiService } from '../../shared/services/product-api.service';
import { Store } from '@ngrx/store';
import { addToCart } from '../../states/cart/cart.action';
import * as ProductActions from '../../states/product/product.action';
import * as ProductSelectors from '../../states/product/product.selector';
import { CartStore } from '../../Store/cart.store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    ProductCardComponent,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  http = inject(HttpClient);
  productApi = inject(ProductApiService);
  products$!: Observable<IProduct[]>;
  error!: Observable<string | null>;
  cartStore = inject(CartStore);

  showAlert = true;
  productsList: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  searchText = '';
  categories: string[] = [];

  selectedCategory = "";
  selectedRating = "";
  minPrice: number | null = null;
  maxPrice: number | null = null;

  constructor(private store: Store<{ cart: { products: IProduct[] } }>) {
    this.store.dispatch(ProductActions.loadProduct());
    this.products$ = this.store.select(ProductSelectors.selectAllProducts);
    this.error = this.store.select(ProductSelectors.selectProductError);

    this.store
      .select(ProductSelectors.selectAllProducts)
      .subscribe((products) => {
        this.productsList = products;
        this.filteredProducts = products; // initial load
      });
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProduct());
    this.store
      .select(ProductSelectors.selectAllProducts)
      .subscribe((products) => {
        if (products && products.length > 0) {
          this.productsList = products;
          this.filteredProducts = [...products]; // Always reset on load
          this.categories = [...new Set(products.map(p => p.category))]; //extract unique categories
        }
      });
  }

  addItemToCart(product: IProduct) {
    //this.store.dispatch(addToCart({ product }));
    this.cartStore.addToCart(product);
  }

  normalize(str: string): string {
    return str
      .toLowerCase()
      .replace(/['"]/g, '') // remove quotes
      .replace(/\s+/g, ' ')
      .trim();
  }

  filterProducts(): void {
    const q = this.normalize(this.searchText);

    if (!q) {
      this.filteredProducts = [...this.productsList];
      return;
    }

    this.filteredProducts = this.productsList.filter((prod) => {
      return (
        this.normalize(prod.title).includes(q) ||
        this.normalize(prod.description).includes(q) ||
        this.normalize(prod.category).includes(q)
      );
    });
  }

  closeAlert() {
    this.showAlert = false;
  }

  applyFilters() {
  const text = this.searchText.toLowerCase();

  this.filteredProducts = this.productsList.filter(p => {
    let matchesSearch =
      p.title.toLowerCase().includes(text) ||
      p.description.toLowerCase().includes(text);

    let matchesCategory =
      !this.selectedCategory || p.category === this.selectedCategory;

    let matchesRating =
      !this.selectedRating || p.rating.rate >= Number(this.selectedRating);

    let matchesPrice =
      (!this.minPrice || p.price >= this.minPrice) &&
      (!this.maxPrice || p.price <= this.maxPrice);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesRating &&
      matchesPrice
    );
  });
}

resetFilters() {
  this.selectedCategory = "";
  this.selectedRating = "";
  this.minPrice = null;
  this.maxPrice = null;
  this.searchText = "";

  this.filteredProducts = [...this.productsList];
}

showFilters = true; // filters OPEN initially

toggleFilters() {
  this.showFilters = !this.showFilters;
}


}
