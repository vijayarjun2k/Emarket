import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule} from '@angular/common';
import { Observable } from 'rxjs';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { IProduct } from '../../shared/models/product.interface';
import { ProductApiService } from '../../shared/services/product-api.service';
import { Store } from '@ngrx/store';
import { addToCart } from '../../states/cart/cart.action';
import * as ProductActions from '../../states/product/product.action'
import * as ProductSelectors from '../../states/product/product.selector';
import { CartStore } from '../../Store/cart.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    ProductCardComponent
],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  http = inject(HttpClient);
  productApi = inject(ProductApiService);
  products$!: Observable<IProduct[]>;
  error!: Observable<string | null>;
  cartStore = inject(CartStore);
  constructor(private store: Store<{ cart: { products: IProduct[] } }>) {
    this.store.dispatch(ProductActions.loadProduct());
    this.products$ = this.store.select(ProductSelectors.selectAllProducts);
    this.error = this.store.select(ProductSelectors.selectProductError);
  }

  ngOnInit(): void {}

  addItemToCart(product: IProduct) {
    //this.store.dispatch(addToCart({ product }));
    this.cartStore.addToCart(product);
  }
}
